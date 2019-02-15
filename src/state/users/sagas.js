import { normalize } from 'normalizr';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiClient } from '../../api-client';
import { usersList, user as userSchema } from '../../api/schema';
import history from '../../history';
import { addEntities } from '../../redux/actions';
import { types } from './action-types';
import { addPathError, addPathRequested, addPathSuccess, authRequestError, authRequestSuccess, fetchCurrentUser, logoutSuccess, logoutError } from './actions';


function* fetchLoggedUser() {

    try {
        const user = yield call(ApiClient.fetchCurrUser);
        const data = normalize(user.data.user, userSchema)
        yield put(addEntities(data.entities));
        yield put(authRequestSuccess(user.data.user))
    } catch (error) {
        console.error("error")
        yield put(authRequestError(error))
    }
}

function* authorize({ payload }) {

    try {
        const user = yield call(ApiClient.login, payload.email, payload.password);



        console.log(user);
        //  yield put(authRequestSuccess(user.data.user))

        yield put(fetchCurrentUser())

        history.push('/');
    } catch (error) {
        yield put(authRequestError(error))
    }

}


function* addPath(action) {

    const { userId, path } = action.payload;

    yield put(addPathRequested())

    try {

        const x = yield call(ApiClient.updatePath, { userId, pathId: path })


        yield put(addPathSuccess({ userId, path }))

    } catch (error) {
        yield put(addPathError(error))
    }
}

function* updateUserInfo(action) {

    const { userId, update } = action.payload;

    try {
        const x = yield call(ApiClient.updateUser, { userId, update })
    } catch (error) {
        console.log("ERROR!")
    }

}


function* fetchUsers(action) {

    try {
        const response = yield call(ApiClient.fetchUsers);
        const data = normalize(response.data, [usersList]);

        yield put(addEntities(data.entities));
    } catch (e) {
        // yield put(fetchFailed(e));
        return;
    }
}

function* register(action) {

    const { user } = action.payload;

    try {
        const x = yield call(ApiClient.register, user)
        history.push('/login');

    } catch (error) {
        console.log("ERROR!")
    }
}

function* logout() {

    try {
        const response = yield call(ApiClient.logout);
        yield put(logoutSuccess())
    } catch (e) {
        yield put(logoutError(e));
        return;
    }
}

function* rootSaga() {

    yield all(
        [
            yield takeLatest(types.fetchUser, fetchLoggedUser),
            yield takeLatest(types.authRequest, authorize),
            yield takeLatest(types.addPath, addPath),
            yield takeLatest(types.fetchUsers, fetchUsers),
            yield takeLatest(types.updateUserInfo, updateUserInfo),
            yield takeLatest(types.logout, logout),
            yield takeLatest(types.register, register)
        ]
    );
}

export default rootSaga;

