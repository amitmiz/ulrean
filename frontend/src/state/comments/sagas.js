import { normalize } from 'normalizr';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { ApiClient } from '../../ApiClient';
import { comment } from '../../api/schema';
import { addEntities } from '../../redux/actions';
import { loggedInUserSelector } from '../users/reducer';
import { postCommentError, postCommentSuccess, types } from './actions';





export function* postComment(action) {
    const currentUser = yield select(loggedInUserSelector);
    const { content, question_id } = action.payload

    try {

        const {data} = yield call(ApiClient.postComment, question_id, { content })
        let {entities} = normalize(data.comment,comment)

        yield put(addEntities({comments : entities.comments}));
        yield put(postCommentSuccess())
    } catch (error) {
        yield put(postCommentError(error))
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
        replies: [],
        date: new Date().toISOString(),
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(newQ), 500)
    })
}



export default function* rootSaga() {
    yield all([
        takeLatest(types.postComment, postComment)
    ])
}