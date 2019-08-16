import { handleActions } from 'redux-actions';
import { types } from './actions';
import { ADD_ENTITIES } from '../../redux/actions';
const ns = "paths"


export const makePathSelector = pathId => state => state[ns].models[pathId];
export const allPathsSelector = (state) => {
    return (state[ns].models && Object.keys(state[ns].models).map(key => state[ns].models[key])) || []
};
export const pathsApiSeletor = state => state[ns].api




const initialState = {
    api: { isLoading: false, error: null },
    models: {}
}


const reducerMap = {
    ["FETCH_PATHS"]: (state, { payload }) => ({ ...state, api: { isLoading: true } }),
    [ADD_ENTITIES]: (state, { payload }) => ({
        ...state, api: { isLoading: false }, models: { ...state.models, ...payload.predefiendPaths }
    }),
    [types.addNewPath]: (state, { payload }) => ({
        ...state, api: { isLoading: true }
    }),

    [types.addNewPathSuccess]: (state, { payload }) => ({
        ...state, models: { ...state.models, [payload._id]: payload }
    }),

    [types.addNewPathError]: (state, { payload }) => ({
        ...state, api: { error: payload }
    })



}

export default handleActions(reducerMap, initialState);