import { types, reviewSubmissionSuccess } from './actions';
import { put, all, takeLatest, select, call } from 'redux-saga/effects';
import { loggedInUserSelector } from '../users/reducer';
import { submitProjectSuccess, submitProjectError } from './actions';
import { currentMountedStage } from '../stage-proccessor';
import { ApiClient } from '../../ApiClient';
import { normalize } from 'normalizr';
import { submission, submissions } from '../../api/schema'
import { addEntities } from '../../redux/actions';



function* submitProject(action) {

    const { gitLink } = action.payload;
    const stage = yield select(currentMountedStage)

    try {
        const result = yield call(ApiClient.postSubmission, { gitLink, stage })
        const { entities } = normalize(result.data.submission, submission)
        yield put(addEntities(entities));
        yield put(submitProjectSuccess(result))

    } catch (error) {
        yield put(submitProjectError(error))
    }



}

function* reviewSubmission({ type, payload }) {

    const currentUser = yield select(loggedInUserSelector)
    const submissionId = payload.submissionId
    try {
        const result = yield call(ApiClient.reviewSubmission, submissionId, { teacher: currentUser._id, comments: payload.comments, pass: payload.pass })
        const { entities } = normalize(result.data.submission, submission)
        yield put(addEntities(entities));
        yield put(reviewSubmissionSuccess({ _id: submissionId, result }))
    } catch (error) {
        yield put(submitProjectError(error))
    }
}

function* fetchStageSubmissions({ type, payload }) {

    const stage = yield select(currentMountedStage)

    debugger;

    const result = yield call(ApiClient.fetchStageSubmissions, stage)
    const { entities } = normalize(result.data.submissions, submissions)

    yield put(addEntities(entities));



}

function* fetchSubmissions({ type, payload }) {


    const result = yield call(ApiClient.fetchSubmissions)
    const { entities } = normalize(result.data.submissions, submissions)

    yield put(addEntities(entities));



}


const serverMock = ({ userId, gitLink, stageId }) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => resolve({
            _id: `${Math.random() * 1000000}`,
            stageId,
            userId,
            gitLink,
            testResult: null,
            dateSubmited: "2018-12-07T18:02:00.611Z",
        }), 500)

    })
}


const serverMockReviewSubmit = ({ teacher, comments, pass }) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => resolve({

            teacher,
            comments,
            date: new Date(),
            pass

        }), 500)

    })
}





export default function* rootSaga() {
    yield all(
        [
            takeLatest(types.fetchStageSubmissions, fetchStageSubmissions),
            takeLatest(types.submitProject, submitProject),
            takeLatest(types.reviewSubmission, reviewSubmission),
            takeLatest(types.fetchSubmissions, fetchSubmissions)
        ]
    )
}