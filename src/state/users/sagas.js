import { normalize } from 'normalizr';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiClient } from '../../api-client';
import { usersList } from '../../api/schema';
import history from '../../history';
import { addEntities } from '../../redux/actions';
import { types } from './action-types';
import { addPathError, addPathRequested, addPathSuccess, authRequestError, authRequestSuccess } from './actions';


function* fetchLoggedUser() {

    try {
        const user = yield call(ApiClient.fetchCurrUser);



        console.log(user);
        yield put(authRequestSuccess(user.data.user))
        history.push('/');
    } catch (error) {
        yield put(authRequestError(error))
    }



}

function* authorize({ payload }) {

    try {
        const user = yield call(ApiClient.login, payload.user, payload.password);



        console.log(user);
        yield put(authRequestSuccess(user.data.user))
        history.push('/');
    } catch (error) {
        yield put(authRequestError(error))
    }

}


function* addPath(action) {

    const { userId, path } = action.payload;

    yield put(addPathRequested())

    try {

        yield put(addPathSuccess({ userId, path }))

    } catch (error) {
        yield put(addPathError(error))
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

function* rootSaga() {

    yield all(
        [
            yield takeLatest("FETCH_USER", fetchLoggedUser),
            yield takeLatest(types.authRequest, authorize),
            yield takeLatest(types.addPath, addPath),
            yield takeLatest(types.fetchUsers, fetchUsers),
        ]
    );
}

export default rootSaga;

