import { toArray } from 'lodash';
import { createAction, handleActions } from 'redux-actions';

export const fetchStages = createAction("STAGES/FETCH_STAGES");
export const addNewStage = createAction("STAGES/ADD_NEW");


const ns = "stages"

const initialState = {
    api: {},
    models: {
    }
}


export const stageSelector = (id, state) => state[ns].models[id];
export const makeStageSelector = (id) => (state) => state[ns].models[id];
export const stagesSelector = (state) => toArray(state[ns].models);


const reducerMap = {
    ["ADD_ENTITIES"]: (state, { payload }) => ({
        ...state, models: { ...payload.stages, ...state.models }
    })
}

export default handleActions(reducerMap, initialState);