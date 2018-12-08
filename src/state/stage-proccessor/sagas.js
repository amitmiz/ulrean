import { all, put, select, takeLatest } from 'redux-saga/effects';
import { createFiles, initTests, updateStageMeta } from '.';
import { mountStageError, mountStageSuccess, stageComplete, types } from './';
import { makeStageSelector } from '../stages/reducer';
import { types as stageProccessorTypes } from './index';


function* mountStage(action) {
    const { stageId, courseId } = action.payload;

    try {
        const stageSelector = makeStageSelector(stageId);
        const stage = yield select(stageSelector)

        const {
            _id,
            files,
            title,
            tests,
            stageType,
            template,
            required
        } = stage;


        const mountingProccess = [
            put(updateStageMeta({ title, stageType, _id, courseId, template, required })),
            put(mountStageSuccess(_id))
        ]

        if (files) {
            mountingProccess.unshift(put(createFiles(files)))
        }

        if (tests) {
            mountingProccess.unshift(put(initTests(tests)))
        }


        yield all(mountingProccess);



    } catch (error) {
        yield put(mountStageError(error));
    }
}



function* checkStageTestsResults(action) {
    const tests = action.payload;

    const isCompleted = tests.every(test => test.pass && !test.err);

    if (isCompleted) {
        yield put(stageComplete())
    }
}

function* submitStage(action) {

}


function* rootSaga() {
    yield all[yield takeLatest(types.mountStage, mountStage), yield takeLatest(stageProccessorTypes.updateTests, checkStageTestsResults)];
}

export { rootSaga };

