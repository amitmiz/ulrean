import { normalize } from 'normalizr';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiClient } from '../../api-client';
import { question, questions } from '../../api/schema';
import { addEntities } from '../../redux/actions';
import { loggedInUserSelector } from '../users/reducer';
import { postQuestionError, postQuestionSuccess, postReplyError, postReplySuccess, types } from './actions';



export function* fetchQuestions() {


    try {
        const response = yield call(ApiClient.fetchQuestions)
        const data = normalize(response.data, [questions]);

        yield put(addEntities(data.entities));
    } catch (error) {
        console.error(error)
    }
}

export function* fetchQuestion(action) {
    try {
        const response = yield call(ApiClient.fetchQuestion, action.payload._id)
        const data = normalize(response.data, questions);
        yield put(addEntities(data.entities));
    } catch (error) {
        console.error(error)
    }
}

export function* postQuestion(action) {
    const { content, tags, header } = action.payload

    try {
        const newQuestion = yield call(ApiClient.postQuestion, { content, tags, header })

        let { entities } = normalize(newQuestion.data.question, question)
        yield put(postQuestionSuccess())
        yield put(addEntities(entities))
    } catch (error) {
        yield put(postQuestionError(error))
    }

}



export default function* rootSaga() {
    yield all([
        takeLatest(types.fetchQuestions, fetchQuestions),
        takeLatest(types.postQuestion, postQuestion),
        takeLatest(types.fetchQuestion, fetchQuestion)
    ])
}