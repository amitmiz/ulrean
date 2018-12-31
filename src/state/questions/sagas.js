import { all, select, put, call, takeLatest } from 'redux-saga/effects'
import { loggedInUserSelector } from '../users/reducer';
import { postQuestionSuccess, postQuestionError, postReplySuccess, postReplyError } from './actions';

import { types } from './actions';

export function* postQuestion(action) {
    const currentUser = yield select(loggedInUserSelector);
    const { content, tags, header } = action.payload

    try {
        const newQuestion = yield call(serverMockNewQuestion, { content, tags, header, userId: currentUser._id })
        yield put(postQuestionSuccess(newQuestion))
    } catch (error) {
        yield put(postQuestionError(error))
    }

}

export function* postReply(action) {
    const currentUser = yield select(loggedInUserSelector);
    const { content, questionId } = action.payload

    try {
        const reply = yield call(serverMockNewReply, { questionId, content, userId: currentUser._id })
        yield put(postReplySuccess({ reply, questionId }))
    } catch (error) {
        yield put(postReplyError(error))
    }

}

function serverMockNewReply({ content, userId, questionId }) {

    const newR = {
        content,
        author: userId,
        date: new Date().toISOString(),
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(newR), 500)
    })
}


function serverMockNewQuestion({ content, header, tags, userId }) {

    const newQ = {
        _id: `${Math.random() * 1000000}`,
        header,
        content,
        tags: tags,
        author: userId,
        replies : [],
        date: new Date().toISOString(),
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(newQ), 500)
    })
}



export default function* rootSaga() {
    yield all([
        takeLatest(types.postQuestion, postQuestion),
        takeLatest(types.postReply, postReply)
    ])
}