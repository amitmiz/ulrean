import { Subject, merge, of, from } from 'rxjs';

import {
  debounceTime,
  switchMap,
  map,
  filter,
  pluck,
  concat,
  tap,
  catchError,
  ignoreElements,
  startWith,
  delay
} from 'rxjs/operators';
import { ofType, combineEpics } from 'redux-observable';
import { overEvery, isString } from 'lodash';

import {
  types,
  stageMetaSelector,
  stageTestsSelector,
  initConsole,
  updateConsole,
  initLogs,
  updateLogs,
  logsToConsole,
  checkStage,
  updateTests,
  disableJSOnError,
  isJSEnabledSelector
} from '.';
import { buildFromFiles, buildBackendStage } from './utils/build';
import {
  runTestsInTestFrame,
  createTestFramer,
  createMainFramer
} from './utils/frame.js';

import { backend } from '../../utils/stageTypes';

const executeDebounceTimeout = 750;

function updateMainEpic(action$, state$, { document }) {
  return action$.pipe(
    ofType(types.updateFile, types.mountStageSuccess),
    debounceTime(executeDebounceTimeout),
    switchMap(() => {
      const frameMain = createMainFramer(document, state$);
      return buildFromFiles(state$.value).pipe(
        map(frameMain),
        ignoreElements(),
        startWith(initConsole('')),
        catchError((...err) => {
          console.error(err);
          return of(disableJSOnError(err.message));
        })
      );
    }),
    catchError(err => {
      console.error(err);
      return of(disableJSOnError(err.message));
    })
  );
}

function executeStageEpic(action$, state$, { document }) {
  return of(document).pipe(
    filter(Boolean),
    switchMap(() => {
      const frameReady = new Subject();
      const consoleProxy = new Subject();
      const frameTests = createTestFramer(
        document,
        state$,
        frameReady,
        consoleProxy
      );
      const stageResults = frameReady.pipe(
        pluck('checkStagePayload'),
        map(checkStagePayload => ({
          checkStagePayload,
          tests: stageTestsSelector(state$.value)
        })),
        switchMap(({ checkStagePayload, tests }) => {
          const postTests = of(
            updateConsole('// tests completed'),
            logsToConsole('// console output'),
            checkStage(checkStagePayload)
          ).pipe(delay(250));
          return runTestsInTestFrame(document, tests).pipe(
            switchMap(tests => {
              return from(tests).pipe(
                map(({ message }) => message),
                filter(overEvery(isString, Boolean)),
                map(updateConsole),
                concat(of(updateTests(tests)))
              );
            }),
            concat(postTests)
          );
        })
      );
      const buildAndFrameStage = action$.pipe(
        ofType(types.executeStage),
        debounceTime(executeDebounceTimeout),
        filter(() => isJSEnabledSelector(state$.value)),
        switchMap(() => {
          const state = state$.value;
          const { stageType } = stageMetaSelector(state);
          const build =
            stageType === backend ? buildBackendStage : buildFromFiles;
          return build(state).pipe(
            tap(frameTests),
            ignoreElements(),
            startWith(initLogs()),
            startWith(initConsole('// running tests')),
            catchError(err => {
              console.error(err);
              return of(disableJSOnError(err));
            })
          );
        })
      );
      const proxyConsole = consoleProxy.pipe(map(updateLogs));
      return merge(buildAndFrameStage, stageResults, proxyConsole);
    })
  );
}

export default combineEpics(updateMainEpic, executeStageEpic);
