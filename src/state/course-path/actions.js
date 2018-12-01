import { createAction } from 'redux-actions';

export const types = {
    fetchPath: 'FETCH_PATH',

    fetchPathRequest: 'FETCH_PATH_REQUEST',
    fetchPathSuccess: 'FETCH_PATH_SUCCESS',
    fetchPathError: 'FETCH_PATH_ERROR',

    updatePath: "UPDATE_PATH"
}

export const fetchPath = createAction(types.fetchPath)
export const fetchPathRequest = createAction(types.fetchPathRequest)
export const fetchPathSuccess = createAction(types.fetchPathSuccess)
export const fetchPathError = createAction(types.fetchPathError)
export const updatePath = createAction(types.updatePath)
