import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiClient } from '../../api-client';
import history from '../../history';
import { types } from './user.action-types';
import { authRequest, authRequestError, authRequestSuccess } from './users.actions';


export function* authorize(action) {

    yield put(authRequest())

    try {
        const user = yield call(ApiClient.getUserById, 123123434);
        console.log(user);
        yield put(authRequestSuccess(user))
        history.push('/');
    } catch (error) {
        yield put(authRequestError(error))
    }



}



function* rootSaga() {
    yield takeEvery(types.loginRequest, authorize);
}

export { rootSaga };


