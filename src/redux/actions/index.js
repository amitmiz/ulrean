import { types } from "./action-types";




export const fetchStage = stageId => ({ type: types.fetchStage, payload: stageId });

export const fetchStageSuccess = stageId => ({ type: types.fetchStageSuccess, payload: stageId });

export const fetchStageError = stageId => ({ type: types.fetchStageError, payload: stageId });
