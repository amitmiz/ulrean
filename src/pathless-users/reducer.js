import { handleActions } from 'redux-actions';
import { types } from './actions';

const ns = "pathless"

export const isPathlessUsersLoadingSelector = (state) => state[ns].isLoading;
export const pathlessUsersErrorSelector = (state) => state[ns].error;
export const pathLessUsersSelector = (state) => state[ns].users;
export const getPathlessUserSelector = (state, userId) => state[ns].users.find(user => user._id === Number(userId))



const initialState = {
    isLoading: true,
    error: null,
    users: [],
    addPathStatus: {
        isLoading: false,
        error: null
    }
}

// state.users.filter(user => user._id !== payload)


const reducerMap = {
    [types.fetchPathlessUserSuccess]: (state, { payload }) => ({
        ...state, isLoading: false, users: payload
    }),
    [types.fetchPathlessUserError]: (state, { payload }) => ({
        ...state, error: payload, isLoading: false
    }),
    [types.addPathRequested]: (state, { payload }) => ({
        ...state, addPathStatus: { isLoading: true, error: null }
    }),
    [types.addPathSuccess]: (state, { payload }) => ({
        ...state, users: state.users.filter(user => user._id !== payload), addPathStatus: { isLoading: false, error: null }
    }),
    [types.addPathError]: (state, { payload }) => ({
        ...state, addPathStatus: { isLoading: false, error: payload }
    })

}


export default handleActions(reducerMap, initialState);