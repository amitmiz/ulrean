import { handleActions } from 'redux-actions';
import { types } from './actions';


const ns = "ui"

const initialState = {
    sidebarOpen: false
}


export const sideBarOpenSelector = (state) => state[ns].sidebarOpen

const reducerMap = {
    [types.setSideBarOpen]: (state, { payload }) => ({
        ...state, sidebarOpen: payload
    })
}

export default handleActions(reducerMap, initialState)