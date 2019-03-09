import { isString, overEvery } from 'lodash';
import { combineEpics, ofType } from 'redux-observable';
import { from, merge, of, Subject } from 'rxjs';
import { catchError, concat, debounceTime, delay, filter, ignoreElements, map, pluck, startWith, switchMap, tap } from 'rxjs/operators';
import { checkStage, disableJSOnError, initConsole, initLogs, logsToConsole, stageMetaSelector, stageTestsSelector, types, updateConsole, updateLogs, updateTests } from '.';
import { backend } from '../../utils/stageTypes';
import { buildBackendStage, buildFromFiles } from './utils/build';
import { createMainFramer, createTestFramer, runTestsInTestFrame } from './utils/frame.js';

const executeDebounceTimeout = 750;

function updateMainEpic(action$, state$, { document }) {
  return action$
    .pipe(
      ofType(types.updateFile, types.mountStageSuccess),
      debounceTime(executeDebounceTimeout),
      switchMap(init),
      catchError(err => {
        console.error(err);
        return of(disableJSOnError(err.message));
      })
    );

  function init() {
    const frameMain = createMainFramer(document, state$);
    return buildFromFiles(state$.value)
      .pipe(
        map(frameMain),
        ignoreElements(),
        startWith(initConsole('')),
        catchError((...err) => {
          console.error(err);
          return of(disableJSOnError(err.message));
        })
      );
  }
}

function executeStageEpic(action$, state$, { document }) {
  return of(document).pipe(
    filter(Boolean),
    switchMap(() => execute(document, state$, action$))
  );
}

function execute(document, state$, action$) {
  const frameReady = new Subject();
  const consoleProxy = new Subject();
  const frameTests = createTestFramer(document, state$, frameReady, consoleProxy);

  const buildAndFrameStage = action$
    .pipe(
      ofType(types.executeStage),
      debounceTime(executeDebounceTimeout),
      switchMap(() => {
        const state = state$.value;
        const { stageType } = stageMetaSelector(state);
        const build = stageType === backend ? buildBackendStage : buildFromFiles;
        return build(state)
          .pipe(
            tap(frameTests),
            ignoreElements(),
            startWith(initLogs()), startWith(initConsole('// Started Analyzing Your Code!')),
            catchError(err => {
              console.error(err);
              return of(disableJSOnError(err));
            })
          );
      })
    );


  const stageResults = frameReady
    .pipe(
      pluck('checkStagePayload'),
      map(checkStagePayload => ({ checkStagePayload, tests: stageTestsSelector(state$.value) })),
      switchMap(({ checkStagePayload, tests }) => {
        const postTests = of(updateConsole('// Finished Analyzing Your Code!'), logsToConsole('// console output'), checkStage(checkStagePayload)).pipe(delay(250));
        return runTestsInTestFrame(document, tests)
          .pipe(
            switchMap(tests => {
              return from(tests).pipe(
                map(({ message }) => message),
                filter(overEvery(isString, Boolean)),
                map(updateConsole),
                concat(of(updateTests(tests)))
              );
            }),
            concat(postTests));
      })
    );

  const proxyConsole = consoleProxy.pipe(map(updateLogs));

  return merge(buildAndFrameStage, stageResults, proxyConsole);
}


export default combineEpics(updateMainEpic, executeStageEpic);
