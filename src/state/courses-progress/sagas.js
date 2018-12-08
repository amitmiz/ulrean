import { all, put, select, takeLatest, call } from 'redux-saga/effects';
import { stageMetaSelector } from '../stage-proccessor';
import { types as stageTypes } from '../stage-proccessor';
import { updateCourseProgressError, updateCourseProgressRequested, updateCourseProgressSuccess } from './actions';
import { makeCourseCompletionProgressSelector } from './reducer';
import { makeCourseSelector } from '../courses/reducer'

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
            // TODO API SHIT
            const newProgress = yield call(mockServerSide, course, progress, stageIndex);
            debugger

            yield put(updateCourseProgressSuccess({ courseId ,newProgress : {...newProgress}}))
        } catch (error) {
            debugger;
            yield put(updateCourseProgressError(error));
        }
    }
}

const mockServerSide = (course, progress, stageIndex) => {
    let completed = (course.stages.length === stageIndex + 1) ? true : false

    return { ...progress, stagesCompleted: stageIndex + 1, completed }
}



export function* rootSaga() {
    yield all([yield takeLatest(stageTypes.stageComplete, updateCourseProgression)])
}