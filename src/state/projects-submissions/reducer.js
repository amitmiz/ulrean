import { handleActions } from 'redux-actions';
import { filter, toArray } from 'lodash';
import { types } from './actions';


const ns = "projectsSubmissions"

const initialState = {
    api: {
        isLoading: false,
        error: null
    },
    models: {
        "123123123123": {
            _id: "123123123123",
            stage: "123212",
            user: "123123434",
            gitLink: "https://gitush.com",
            testResult: null,
            dateSubmited: "2018-12-07T18:02:00.611Z",
            testResult: {
                teacher: "123123",
                comments: "asdsad",
                date: "2018-12-07T18:02:00.611Z",
                pass: false
            }


        },
        "1231231231a23": {
            _id: "1231231231a23",
            stage: "123212222",
            user: "123123434",
            gitLink: "https://gitush.com",
            dateSubmited: "2018-12-07T18:02:00.611Z",
            testResult: {
                teacher: "12314342312312",
                comments: "",
                date: "2018-12-07T18:02:00.611Z",
                pass: false
            }
        },
        "1234331231a23": {
            _id: "1234331231a23",
            stage: "123212222",
            user: "123123434",
            gitLink: "https://gitush.com",
            dateSubmited: "2018-12-07T18:02:00.611Z"
        }
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
    [types.submitProject]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.submitProjectSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }, models: { ...state.models, [payload._id]: payload }
    }),
    [types.submitProjectError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    }),
    [types.reviewSubmission]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.reviewSubmissionSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }, models: { ...state.models, [payload._id]: addTestResult(state, payload._id, payload.result) }
    }),
    [types.reviewSubmissionError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })
}


export default handleActions(reducerMap, initialState);