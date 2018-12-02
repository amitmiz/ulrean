import { types } from "./user.action-types";
import { createAction } from 'redux-actions';





export const loginRequest = (userName, password) => ({ type: types.loginRequest, payload: { userName, password } });
export const authRequest = createAction(types.authRequest)
export const authRequestSuccess = createAction(types.authRequestSuccess)
export const authRequestError = createAction(types.authRequestError)


export const fetchPathlessUser = createAction(types.fetchPathlessUser)
export const fetchPathlessUserSuccess = createAction(types.fetchPathlessUserSuccess)
export const fetchPathlessUserError = createAction(types.fetchPathlessUserError)


export const addPath = createAction(types.addPath)
export const addPathRequested = createAction(types.addPathRequested)
export const addPathSuccess = createAction(types.addPathSuccess)
export const addPathError = createAction(types.addPathError)