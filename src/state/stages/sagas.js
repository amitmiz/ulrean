import { all, put, select, takeLatest } from 'redux-saga/effects';
import { challengeMounted, createFiles, initTests, updateChallengeMeta, updateSuccessMessage } from '../stage-proccessor/redux';
import { types, initStageSuccess, initStageError } from './actions';
import { stageSelector } from './reducer';


function* initStage(action) {
    try {
        const stage = yield select(state => stageSelector(action.payload, state))

        const {
            _id,
            files,
            title,
            tests,
            challengeType,
            title: currentTitle,
        } = stage;



        yield all(
            [
                put(createFiles(files)),
                put(initTests(tests)),
                put(updateChallengeMeta({
                    title: currentTitle,
                    challengeType
                }
                )),

                put(updateSuccessMessage("randomCompliment()")),
                put(challengeMounted(_id)),
                put(initStageSuccess(stage))
            ]
        );



    } catch (error) {
        yield put(initStageError(error));
    }
}



function* rootSaga() {
    yield takeLatest(types.initStage, initStage);
}

export { rootSaga };

