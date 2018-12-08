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
            stageId: "123212",
            userId: "123123434",
            gitLink: "gitush.com",
            testResult: null,
            dateSubmited: "2018-12-07T18:02:00.611Z",
            testResult: {
                teacher: 123123,
                comments: "asdsad",
                date: "2018-12-07T18:02:00.611Z",
                pass: false
            }


        },
        "1231231231a23": {
            stageId: "12321a",
            userId: "123123434",
            gitLink: "gitush.com",
            dateSubmited: "2018-12-07T18:02:00.611Z",
            testResult: {
                teacher: null,
                comments: "",
                date: "2018-12-07T18:02:00.611Z",
                pass: false
            }
        }
    }


}

export const makeUserStageSubmissionsSelector = ({ userId, stageId }) => (state) => {
    return filter(toArray(state[ns].models), x => x.userId === userId && x.stageId === stageId)

}

export const unhandledSubmissionsSelector = state => filter(toArray(state[ns].modles), x => !x.testResult)





const reducerMap = {
    [types.submitProject]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.submitProjectSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }, models: { ...state.models, [payload._id]: payload }
    }),
    [types.submitProjectError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })
}


export default handleActions(reducerMap, initialState);