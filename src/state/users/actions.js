import { types } from "./action-types";
import { createAction } from 'redux-actions';



export const fetchCurrentUser = createAction("FETCH_USER")


export const loginRequest = (userName, password) => ({ type: types.loginRequest, payload: { userName, password } });
export const authRequest = createAction(types.authRequest)
export const authRequestSuccess = createAction(types.authRequestSuccess)
export const authRequestError = createAction(types.authRequestError)

export const logout = createAction(types.logout);
export const logoutSuccess = createAction(types.logoutSuccess);
export const logoutError = createAction(types.logoutError);


export const fetchUsers = createAction(types.fetchUsers)
export const fetchUsersSuccess = createAction(types.fetchUsersSuccess)
export const fetchUsersError = createAction(types.fetchUsersError)


export const addPath = createAction(types.addPath)
export const addPathRequested = createAction(types.addPathRequested)
export const addPathSuccess = createAction(types.addPathSuccess)
export const addPathError = createAction(types.addPathError)

export const updateUserInfo = createAction(types.updateUserInfo);

export const register = createAction(types.register)