import { handleActions } from 'redux-actions';
import { filter, toArray } from 'lodash';
import { types } from './actions';
import { ADD_ENTITIES } from '../../redux/actions';


const ns = "projectsSubmissions"

const initialState = {
    api: {
        isLoading: false,
        error: null
    },
    models: {
    }


}

export const makeUserStageSubmissionsSelector = ({ user, stage }) => (state) => {
    return filter(toArray(state[ns].models), x => x.user === user && x.stage === stage)

}

export const makesSubmissionSelector = id => state => state[ns].models[id]

export const unhandledSubmissionsSelector = state => filter(toArray(state[ns].models), x => !x.testResult)



const addTestResult = (state, submissionId, testResult) => ({
    ...state.models[submissionId], testResult
})

const reducerMap = {
    [ADD_ENTITIES]: (state, { payload }) => ({
        ...state, models: {
            ...state.models,
            ...payload.submissions
        }
    }),

    [types.submitProject]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.submitProjectSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }
    }),
    [types.submitProjectError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    }),
    [types.reviewSubmission]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.reviewSubmissionSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }
    }),
    [types.reviewSubmissionError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })
}


export default handleActions(reducerMap, initialState);