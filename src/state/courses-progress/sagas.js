import { all, put, select, takeLatest, call } from 'redux-saga/effects';
import { stageMetaSelector } from '../stage-proccessor';
import { types as stageTypes } from '../stage-proccessor';
import { makeCourseCompletionProgressSelector, updateCourseProgressError, updateCourseProgressRequested, updateCourseProgressSuccess } from './reducer';
import { makeCourseSelector } from '../courses/reducer'
import { ApiClient } from '../../api-client';






function* updateCourseProgression() {

    const { _id, courseId } = yield select(stageMetaSelector);
    const courseSelector = makeCourseSelector(courseId);

    const course = yield select(courseSelector)

    const stageIndex = course.stages.findIndex(stageId => stageId === _id);


    const courseCompletionProgressSelector = makeCourseCompletionProgressSelector(courseId);
    const progress = yield select(courseCompletionProgressSelector);
    if (progress.stagesCompleted < stageIndex + 1) {

        yield put(updateCourseProgressRequested(course._id));
        try {

            const {data} = yield call(ApiClient.updateProgress, { course_id: course._id, stage: progress.stagesCompleted + 1 });

            yield put(updateCourseProgressSuccess({ course: course._id, newProgress: { ...data.courseProgress } }))
        } catch (error) {

            yield put(updateCourseProgressError(error));
        }
    }
}

const mockServerSide = (course, progress, stageIndex) => {
    let completed = (course.stages.length === stageIndex + 1) ? true : false

    return { ...progress, stagesCompleted: stageIndex + 1, completed }
}



export default function* rootSaga() {
    yield all([yield takeLatest(stageTypes.stageComplete, updateCourseProgression)])
}