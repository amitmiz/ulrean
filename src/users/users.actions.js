import { types } from "./user.action-types";

export const loginRequest = (userName, password) => ({ type: types.loginRequest, payload: { userName, password } });
export const authRequest = () => ({ type: types.authRequest });
export const authRequestSuccess = user => ({ type: types.authRequestSuccess, payload: user });
export const authRequestError = error => ({ type: types.loginRequest, payload: error });