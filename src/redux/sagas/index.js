import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiClient } from '../../api-client';
import { types } from '../actions/action-types';
import { createFiles, initTests, updateChallengeMeta, updateSuccessMessage, challengeMounted } from '../../stage-proccessor/redux';

function* fetchStage(action) {
    try {
        const stage = yield call(ApiClient.getStageById, action.payload);

        const {
            files,
            title,
            tests,
            challengeType,
            title: currentTitle,
        } = stage;

        const { stageMetadata } = stage


        yield all(
            [
                put(createFiles(files)),
                put(initTests(tests)),
                put(updateChallengeMeta({
                    ...stageMetadata,
                    title: currentTitle,
                    challengeType
                }
                )),

                put(updateSuccessMessage("randomCompliment()")),
                put(challengeMounted(stageMetadata.id)),
                put({ type: types.fetchStageSuccess, payload: stage })
            ]
        );



    } catch (error) {
        yield put({ type: types.fetchStageError, payload: error });
    }
}



function* rootSaga() {
    yield takeLatest(types.fetchStage, fetchStage);
}

export { rootSaga };
