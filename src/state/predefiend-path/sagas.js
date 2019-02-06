import { normalize } from 'normalizr';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiClient } from '../../api-client';
import { predefiendPaths } from '../../api/schema';
import { addEntities } from '../../redux/actions';
import { addNewPathError, addNewPathSuccess, types } from './actions';



function* fetchPaths(action) {

    try {
        const response = yield call(ApiClient.fetchPredefiendPaths);
        const data = normalize(response.data, [predefiendPaths]);

        yield put(addEntities(data.entities));
    } catch (e) {
        console.error(e)
        // yield put(fetchFailed(e));
        return;
    }
}



function* addNewPath(action) {
    const { courses, name } = action.payload;


    try {
        const {data} = yield call(ApiClient.addNewPath, { courses, name })
        yield put(addNewPathSuccess(data.predefiendPath))

    } catch (error) {
        yield put(addNewPathError(error));
    }


}


export default function* rootSaga() {

    yield all(
        [
            yield takeLatest(types.addNewPath, addNewPath),
            yield takeLatest("FETCH_PATHS", fetchPaths)
        ])
}