import { handleActions } from 'redux-actions';

const ns = "stages"

const initialState = {
    api: {},
    models: {



    }
}



export const stageSelector = (id, state) => state[ns].models[id]
export const makeStageSelector = (id) => (state) => state[ns].models[id]

const reducerMap = {
    ["ADD_ENTITIES"]: (state, { payload }) => ({
        ...state, models: { ...payload.stages, ...state.models }
    })
}

export default handleActions(reducerMap, initialState);