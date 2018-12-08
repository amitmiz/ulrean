import { createAction } from 'redux-actions';

export const types = {
    addNewPath: "ADD_NEW_PATH",
    addNewPathSuccess: "ADD_NEW_PATH_SUCCESS",
    addNewPathError: "ADD_NEW_PATH_FAILED",



}

export const addNewPath = createAction(types.addNewPath);
export const addNewPathSuccess = createAction(types.addNewPathSuccess);
export const addNewPathError = createAction(types.addNewPathError);

