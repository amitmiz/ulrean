
import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { ApiClient } from '../api-client';
import { addPathError, addPathRequested, addPathSuccess, fetchPathlessUserError, fetchPathlessUserSuccess, types } from './actions';
import { userSelector } from '../users/user.reducer';
import { updatePath } from '../course-path/actions';


export function* addPath(action) {

    const { id, path } = action.payload;

    yield put(addPathRequested())

    try {

        ApiClient.updateUsersPath(id, path)

        yield put(addPathSuccess(id))

        const currentUser = yield select(userSelector)
        if (currentUser._id === id) {
            yield put(updatePath(path))
        }



    } catch (error) {
        yield put(addPathError(error))
    }
}




export function* fetch(action) {


    try {
        const users = yield call(ApiClient.getPathlessStudents);
        console.log(users);
        yield put(fetchPathlessUserSuccess(users))
    } catch (error) {
        yield put(fetchPathlessUserError(error))
    }
}



function* rootSaga() {
    yield all([yield takeLatest(types.fetchPathlessUser, fetch), yield takeLatest(types.addPath, addPath)]);
}

export { rootSaga };

