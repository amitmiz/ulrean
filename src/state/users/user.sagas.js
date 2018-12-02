import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ApiClient } from '../../api-client';
import history from '../../history';
import { types } from './user.action-types';
import { addPathRequested, authRequest, authRequestError, authRequestSuccess, fetchPathlessUserError, fetchPathlessUserSuccess, addPathSuccess, addPathError } from './users.actions';


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


export function* addPath(action) {

    const { id, path } = action.payload;

    yield put(addPathRequested())

    try {

        yield put(addPathSuccess({id,path}))

    } catch (error) {
        yield put(addPathError(error))
    }
}




export function* fetchPathlessUsers(action) {


    try {
        //const users = yield call(ApiClient.getPathlessStudents);
        yield put(fetchPathlessUserSuccess({}))
    } catch (error) {
        yield put(fetchPathlessUserError(error))
    }
}


function* rootSaga() {

    yield all([yield takeEvery(types.loginRequest, authorize), yield takeLatest(types.fetchPathlessUser, fetchPathlessUsers), yield takeLatest(types.addPath, addPath)]);
}

export { rootSaga };

