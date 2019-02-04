
import { handleActions } from 'redux-actions';

import { types } from './actions'

const ns = "questions"

const initialState = {

    api: {},
    models: {
        "asdasd": {
            _id: "asdasd",
            header: "Question1",
            content: "asdasdasd",
            author: "123123434",
            date : new Date().toISOString(),
            tags: ["pyhton", "sql"],
            replies: [
                {
                    content: "asdasdasd",
                    date : new Date().toISOString(),
                    author: "123123434",
                }

            ]
        },
        "aasddd": {
            _id: "aasddd",
            header: "Question1",
            content: "asdasdasd",
            date : new Date().toISOString(),
            tags: ["pyhton", "sql"],
            author: "123123434"
        },
        "asdasdddd": {
            _id: "asdasdddd",
            header: "Question1",
            content: "asdasdasd",
            date : new Date().toISOString(),
            tags: ["pyhton", "sql"],
            author: "123123434"
        }
    }
}



export const makeQuestionSelector = id => state => state[ns].models[id];
export const questionsSelector = state => Object.keys(state[ns].models).map(key => state[ns].models[key])

const addReply = (models, reply, questionId) => ({ ...models, [questionId]: { ...models[questionId], replies: [...models[questionId].replies, reply] } })


const reducerMap = {
    [types.postQuestion]: (state) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.postQuestionSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }, models: { ...state.models, [payload._id]: payload }
    }),
    [types.postQuestionError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    }),

    [types.postReply]: (state) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.postReplySuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }, models: addReply(state.models, payload.reply, payload.questionId)
    }),
    [types.postReplyError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })


}

export default handleActions(reducerMap, initialState);