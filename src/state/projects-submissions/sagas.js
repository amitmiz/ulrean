import { types } from './actions';
import { put, all, takeLatest, select, call } from 'redux-saga/effects';
import { loggedInUserSelector } from '../users/user.reducer';
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

const serverMock = ({ userId, gitLink, stageId }) => {

    return new Promise((resolve, reject) => {

        setTimeout(() => resolve({
            _id: "!@3123123123",
            stageId,
            userId,
            gitLink,
            testResult: null,
            dateSubmited: "2018-12-07T18:02:00.611Z",
        }), 500)

    })
}



export function* rootSaga() {
    yield all(
        [
            takeLatest(types.submitProject, submitProject)
        ]
    )
}