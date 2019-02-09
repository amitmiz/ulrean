import { all, put, takeLatest } from 'redux-saga/effects';
import { createFiles, initTests, updateStageMeta } from '.';
import { mountStageError, mountStageSuccess, stageComplete, types } from './';
import { types as stageProccessorTypes } from './index';


function* mountStage(action) {
    const { stage, course } = action.payload;

    try {
      
        const {
            _id,
            slug,
            files,
            title,
            tests,
            stageType,
            template,
            required
        } = stage;


        // should only dispatch one action!
        const mountingProccess = [
            put(updateStageMeta({ title, stageType, slug, courseId: course.slug, template, required })),
            put(mountStageSuccess(slug))
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

export default rootSaga;

