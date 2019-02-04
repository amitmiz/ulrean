import { normalize } from 'normalizr';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { courses, coursesList } from '../../api/schema';
import { addEntities } from '../../redux/actions';
import { ApiClient } from '../../api-client';



function* fetchCourses(action) {

    try {
        const response = yield call(ApiClient.fetchCourses);
        const data = normalize(response.data, [coursesList]);

        yield put(addEntities(data.entities));
    } catch (e) {
        // yield put(fetchFailed(e));
        return;
    }
}


export default function* rootSaga() {
    yield all(
        [
            takeLatest("FETCH_COURSES", fetchCourses),
        ]
    )
}