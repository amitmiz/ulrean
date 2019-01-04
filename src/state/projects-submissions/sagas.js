import { types, reviewSubmissionSuccess } from './actions';
import { put, all, takeLatest, select, call } from 'redux-saga/effects';
import { loggedInUserSelector } from '../users/reducer';
import { submitProjectSuccess, submitProjectError } from './actions';
import { currentMountedStage } from '../stage-proccessor';



function* submitProject(action) {

    const { gitLink } = action.payload;
    const currentUser = yield select(loggedInUserSelector)
    const stageId = yield select(currentMountedStage)

    try {

        const submission = yield call(serverMock, { userId: currentUser._id, gitLink, stageId })
        yield put(submitProjectSuccess(submission))

    } catch (error) {
        yield put(submitProjectError(error))
    }



}

function* reviewSubmission({ type, payload }) {

    const currentUser = yield select(loggedInUserSelector)
    const submissionId = payload.submissionId
    try {
        const result = yield call(serverMockReviewSubmit, { teacher: currentUser._id, comments: payload.comments, pass: payload.pass })
        yield put(reviewSubmissionSuccess({ _id: submissionId, result }))
    } catch (error) {
        yield put(submitProjectError(error))
    }
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
            takeLatest(types.submitProject, submitProject),
            takeLatest(types.reviewSubmission, reviewSubmission)
        ]
    )
}