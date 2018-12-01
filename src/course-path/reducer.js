
import { handleActions } from 'redux-actions';
import { types } from './actions';
const ns = "path"

export const pathSelector = state => state[ns].data

const initialState = {
    data: null,
    isLoading: false,
    error: null
}


const reducerMap = {
    [types.fetchPathRequest]: (state) => ({ ...state, isLoading: true, error: null }),
    [types.fetchPathSuccess]: (state, { payload }) => ({ ...state, isLoading: false, data: payload }),
    [types.fetchPathError]: (state, { payload }) => ({ ...state, isLoading: false, error: payload }),
    [types.updatePath]: (state, { payload }) => ({ ...state, isLoading: false, data: payload })



}

export default handleActions(reducerMap, initialState)