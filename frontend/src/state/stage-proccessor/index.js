import { createAction, handleActions } from 'redux-actions';
import { reducer as reduxFormReducer } from 'redux-form';
import executeStageEpic from './execute-stage-epic';
import { createPoly } from './utils/polyvinyl';


const ns = 'stage';
export const backendNS = 'backendStage';

const initialState = {
  mountedStage: null,
  stageFiles: {},
  stageMeta: {
    id: '',
    nextStagePath: '/'
  },
  stageTests: [],
  consoleOut: '',
  isJSEnabled: true,

  projectFormValues: {},
  successMessage: 'Happy Coding!'
};

export const epics = [
  executeStageEpic,
];


export const types = {

  mountStage: "MOUNT_STAGE",
  mountStageSuccess: "MOUNT_STAGE_SUCCESS",
  mountStageError: "MOUNT_STAGE_ERROR",
  stageComplete: "STAGE_COMPLETE",
  submitStage: "SUBMIT_STAGE",




  createFiles: "STAGE_PROCCESSOR/CREATE_FILES",

  initTests: 'STAGE_PROCCESSOR/INIT_TESTS',
  initConsole: 'STAGE_PROCCESSOR/INIT_CONSOLE',
  initLogs: 'STAGE_PROCCESSOR/INIT_LOGS',
  updateConsole: 'STAGE_PROCCESSOR/UPDATE_CONSOLE',
  updateStageMeta: 'STAGE_PROCCESSOR/UPDATE_CHLLENGE_META',
  updateFile: 'STAGE_PROCCESSOR/UPDATE_FILE',
  updateJSEnabled: 'STAGE_PROCCESSOR/UPDATE_JS_ENABLE',
  updateProjectFormValues: 'STAGE_PROCCESSOR/UPDATE_PROJECT_FORM_VALUES',
  updateTests: 'STAGE_PROCCESSOR/UPDATE_TESTS',
  updateLogs: 'STAGE_PROCCESSOR/UPDATE_LOGS',
  logsToConsole: 'STAGE_PROCCESSOR/LOGS_TO_CONSOLE',
  disableJSOnError: 'STAGE_PROCCESSOR/DISABLE_JS_ON_ERROR',
  stageMounted: 'STAGE_PROCCESSOR/STAGE_MOUNTED',
  checkStage: 'STAGE_PROCCESSOR/CHECK_STAGE',
  executeStage: 'STAGE_PROCCESSOR/EXECUTE_STAGE',
  resetStage: 'STAGE_PROCCESSOR/RESET_STAGE',

}



export const createFiles = createAction(types.createFiles, stageFiles =>
  Object.keys(stageFiles)
    .filter(key => stageFiles[key])
    .map(key => stageFiles[key])
    .reduce(
      (stageFiles, file) => ({
        ...stageFiles,
        [file.key]: {
          ...createPoly(file),
          seed: file.contents.slice(0)
        }
      }),
      {}
    )
);

export const initTests = createAction(types.initTests);
export const updateTests = createAction(types.updateTests);

export const initConsole = createAction(types.initConsole);
export const initLogs = createAction(types.initLogs);
export const updateStageMeta = createAction(types.updateStageMeta);
export const updateFile = createAction(types.updateFile);
export const updateConsole = createAction(types.updateConsole);
export const updateLogs = createAction(types.updateLogs);
export const updateJSEnabled = createAction(types.updateJSEnabled);
export const updateProjectFormValues = createAction(
  types.updateProjectFormValues
);


export const logsToConsole = createAction(types.logsToConsole);


export const disableJSOnError = createAction(types.disableJSOnError);


export const stageMounted = createAction(types.stageMounted);
export const checkStage = createAction(types.checkStage);
export const executeStage = createAction(types.executeStage);
export const resetStage = createAction(types.resetStage);



export const mountStage = createAction(types.mountStage);
export const mountStageSuccess = createAction(types.mountStageSuccess);
export const mountStageError = createAction(types.mountStageError);
export const stageComplete = createAction(types.stageComplete);

export const submitStage = createAction(types.submitStage);



// ----------------- SELECTORS

export const stageFilesSelector = state => state[ns].stageFiles;
export const stageMetaSelector = state => state[ns].stageMeta;
export const stageTestsSelector = state => state[ns].stageTests;
export const consoleOutputSelector = state => state[ns].consoleOut;


export const isJSEnabledSelector = state => state[ns].isJSEnabled;


export const backendFormValuesSelector = state => state.form[backendNS];
export const projectFormValuesSelector = state =>
  state[ns].projectFormValues || {};


export const currentMountedStage = state => state[ns].mountedStage;

export const reducer = handleActions(
  {
    [types.mountStageSuccess]: (state, { payload }) => ({
      ...state, mountedStage: payload
    }),

    [types.createFiles]: (state, { payload }) => ({
      ...state,
      stageFiles: payload
    }),
    [types.updateFile]: (state, { payload: { key, editorValue } }) => ({
      ...state,
      stageFiles: {
        ...state.stageFiles,
        [key]: {
          ...state.stageFiles[key],
          contents: editorValue
        }
      }
    }),
    [types.initTests]: (state, { payload }) => ({
      ...state,
      stageTests: payload
    }),
    [types.updateTests]: (state, { payload }) => ({
      ...state,
      stageTests: payload
    }),

    [types.initConsole]: (state, { payload }) => ({
      ...state,
      consoleOut: payload
    }),
    [types.updateConsole]: (state, { payload }) => ({
      ...state,
      consoleOut: state.consoleOut + '\n' + payload
    }),
    [types.initLogs]: state => ({
      ...state,
      logsOut: []
    }),
    [types.updateLogs]: (state, { payload }) => ({
      ...state,
      logsOut: [...state.logsOut, payload]
    }),
    [types.logsToConsole]: (state, { payload }) => ({
      ...state,
      consoleOut:
        state.consoleOut +
        (state.logsOut.length
          ? '\n' + payload + '\n' + state.logsOut.join('\n')
          : '')
    }),
    [types.updateStageMeta]: (state, { payload }) => ({
      ...state,
      stageMeta: { ...payload }
    }),

    [types.resetStage]: state => ({
      ...state,
      stageFiles: {
        ...Object.keys(state.stageFiles)
          .map(key => state.stageFiles[key])
          .reduce(
            (files, file) => ({
              ...files,
              [file.key]: {
                ...file,
                contents: file.seed.slice()
              }
            }),
            {}
          )
      },
      stageTests: state.stageTests.map(({ text, testString }) => ({
        text,
        testString
      })),
      consoleOut: ''
    }),
    [types.updateProjectFormValues]: (state, { payload }) => ({
      ...state,
      projectFormValues: payload
    }),
    [types.disableJSOnError]: (state, { payload }) => ({
      ...state,
      consoleOut: state.consoleOut + ' \n' + payload,
      isJSEnabled: false
    }),
  },
  initialState
);

const resetProjectFormValues = handleActions(
  {
    [types.updateProjectFormValues]: (state, { payload: { solution } }) => {
      if (!solution) {
        return {
          ...state,
          solution: {},
          githubLink: {}
        };
      }
      return state;
    }
  },
  {}
);

export const formReducer = reduxFormReducer.plugin({
  'frond-end-form': resetProjectFormValues,
  'back-end-form': resetProjectFormValues
});
