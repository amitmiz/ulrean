import { types } from "./user.action-types";
import { createAction } from 'redux-actions';





export const loginRequest = (userName, password) => ({ type: types.loginRequest, payload: { userName, password } });
export const authRequest = createAction(types.authRequest)
export const authRequestSuccess = createAction(types.authRequestSuccess)
export const authRequestError = createAction(types.authRequestError)