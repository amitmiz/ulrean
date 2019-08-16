
import { handleActions } from 'redux-actions';

import { types } from './actions'
import { ADD_ENTITIES } from '../../redux/actions';

const ns = "questions"

const initialState = {

    api: {},
    models: {}

}



export const makeQuestionSelector = id => state => state[ns].models[id];
export const questionsSelector = state => Object.keys(state[ns].models).map(key => state[ns].models[key])

const addReply = (models, reply, questionId) => ({ ...models, [questionId]: { ...models[questionId], replies: [...models[questionId].replies, reply] } })


const reducerMap = {
    [types.fetchQuestions]: (state) => ({
        ...state, api: { isLoading: true }
    }),
    [ADD_ENTITIES]: (state, { payload }) => ({
        ...state, models: {
            ...state.models,
            ...payload.questions
        }
    }),

    [types.postQuestion]: (state) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.postQuestionSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }
    }),
    [types.postQuestionError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })


}

export default handleActions(reducerMap, initialState);