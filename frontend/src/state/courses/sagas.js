import { normalize } from 'normalizr';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { courses, coursesList } from '../../api/schema';
import { addEntities } from '../../redux/actions';
import { ApiClient } from '../../ApiClient';



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

function* addNewCourse(action) {

    try {
        const newCourse = yield call(ApiClient.addCourse, action.payload);

        let { entities } = normalize(newCourse.data.course, courses)
        yield put(addEntities(entities))
    } catch (error) {
    }
}


export default function* rootSaga() {
    yield all(
        [
            takeLatest("FETCH_COURSES", fetchCourses),
            takeLatest("COURSES/ADD_NEW", addNewCourse)
        ]
    )
}