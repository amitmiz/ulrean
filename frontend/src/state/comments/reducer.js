
import { handleActions } from 'redux-actions';

import { types } from './actions'
import { ADD_ENTITIES } from '../../redux/actions';

const ns = "comments"

const initialState = {

    api: {},
    models: {}

}


export const commentsSelector = state => Object.keys(state[ns].models).map(key => state[ns].models[key]);


export const questionCommentsSelector = questionId => state => commentsSelector(state).filter(comment => comment.question === questionId);

export const makeQuestionSelector = id => state => state[ns].models[id];
export const questionsSelector = state => Object.keys(state[ns].models).map(key => state[ns].models[key])

const addComment = (models, reply, questionId) => ({ ...models, [questionId]: { ...models[questionId], replies: [...models[questionId].replies, reply] } })


const reducerMap = {
    [types.fetchQuestions]: (state) => ({
        ...state, api: { isLoading: true }
    }),
    [ADD_ENTITIES]: (state, { payload }) => ({
        ...state, models: {
            ...state.models,
            ...payload.comments
        }
    }),
    [types.postComment]: (state) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.postCommentSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }
    }),
    [types.postCommentError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })


}

export default handleActions(reducerMap, initialState);