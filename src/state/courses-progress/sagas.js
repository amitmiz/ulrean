import { all, put, select, takeLatest, call } from 'redux-saga/effects';
import { stageMetaSelector } from '../stage-proccessor';
import { types as stageTypes } from '../stage-proccessor';
import { makeCourseCompletionProgressSelector, updateCourseProgressError, updateCourseProgressRequested, updateCourseProgressSuccess } from './reducer';
import { makeCourseSelector } from '../courses/reducer'
import { ApiClient } from '../../api-client';






function* updateCourseProgression() {

    const { slug, courseId } = yield select(stageMetaSelector);
    const courseSelector = makeCourseSelector(courseId);

    const course = yield select(courseSelector)

    const stageIndex = course.stages.findIndex(stageId => stageId === slug);


    const courseCompletionProgressSelector = makeCourseCompletionProgressSelector(courseId);
    const progress = yield select(courseCompletionProgressSelector);
    if (progress.stagesCompleted < stageIndex + 1) {

        yield put(updateCourseProgressRequested(course.slug));
        try {

            const {data} = yield call(ApiClient.updateProgress, { courseSlug: course.slug, stage: progress.stagesCompleted + 1 });

            yield put(updateCourseProgressSuccess({ course: course.slug, newProgress: { ...data.courseProgress } }))
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