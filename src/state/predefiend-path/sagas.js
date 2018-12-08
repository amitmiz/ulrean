import { all, call, put, takeLatest } from 'redux-saga/effects';
import { addNewPathError, addNewPathSuccess, types } from './actions';




function* addNewPath(action) {
    const { courses, name } = action.payload;


    try {
        const path = yield call(mockServer, { courses, name })
        yield put(addNewPathSuccess(path))

    } catch (error) {
        yield put(addNewPathError(error));
    }


}




function mockServer({ courses, name = "test" }) {

    let path = { _id: "test", courses, name }

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(path), 200);
    })
}






export function* rootSaga() {

    yield all([yield takeLatest(types.addNewPath, addNewPath)])
}