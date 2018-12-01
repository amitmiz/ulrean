import { createAction } from 'redux-actions';

export const types = {
    fetchPathlessUser: 'FETCH_PATHLESS_USERS',
    fetchPathlessUserSuccess: 'FETCH_PATHLESS_USERS_SUCCESS',
    fetchPathlessUserError: 'FETCH_PATHLESS_USERS_ERROR',

    addPath: 'ADD_PATH',
    addPathRequested: 'ADD_PATH_REQUESTED',
    addPathSuccess: 'ADD_PATH_SUCCESS',
    addPathError: 'ADD_PATH_ERROR'

}

export const fetchPathlessUser = createAction(types.fetchPathlessUser)
export const fetchPathlessUserSuccess = createAction(types.fetchPathlessUserSuccess)
export const fetchPathlessUserError = createAction(types.fetchPathlessUserError)


export const addPath = createAction(types.addPath)
export const addPathRequested = createAction(types.addPathRequested)
export const addPathSuccess = createAction(types.addPathSuccess)
export const addPathError = createAction(types.addPathError)