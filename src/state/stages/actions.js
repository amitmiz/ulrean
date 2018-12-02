import {createAction} from 'redux-actions';

export const types = {
    initStage: "INIT_STAGE",
    initStageSuccess: "INIT_STAGE_SUCCESS",
    initStageError: "INIT_STAGE_ERROR"
}





export const initStage = createAction(types.initStage);

export const initStageSuccess = createAction(types.initStageSuccess);

export const initStageError = createAction(types.initStageError);
