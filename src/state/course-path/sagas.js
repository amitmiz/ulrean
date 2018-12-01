import { put, takeLatest, select, all } from 'redux-saga/effects'
import { types, fetchPathRequest, fetchPathSuccess } from './actions'
import { userSelector } from '../users/user.reducer';
import { ApiClient } from '../../api-client';


function* fetch(action) {

    const currentUser = yield select(userSelector)

    yield put(fetchPathRequest())

    try {
        const path = ApiClient.getUserPath(currentUser._id)
        yield put(fetchPathSuccess(path))
    } catch (error) {
        yield put(fetchPathSuccess(error))
    }

}

function* rootSaga() {
    yield all([takeLatest(types.fetchPath, fetch)])
}

export { rootSaga };