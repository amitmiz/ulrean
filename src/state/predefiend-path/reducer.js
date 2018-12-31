import { handleActions } from 'redux-actions';
import { types } from './actions';
const ns = "paths"


export const makePathSelector = pathId => state => state[ns].models[pathId];
export const allPathsSelector = (state) => Object.keys(state[ns].models).map(key => state[ns].models[key]);




const initialState = {
    api: {},
    models: {
        "1212": {
            _id: "1212",
            name: "Frontend",
            courses: ["1111", "12312"]
        },
        "1231":
        {
            _id: "1231",
            name: "Backend",
            courses: ["12312", "12312312"]
        }


    }
}


const reducerMap = {


    [types.addNewPath]: (state, { payload }) => ({
        ...state, api: { isLoading: true }
    }),

    [types.addNewPathSuccess]: (state, { payload }) => ({
        ...state, models: { ...state.models, [payload._id]: payload }
    }),

    [types.addNewPathError]: (state, { payload }) => ({
        ...state, api: { error: payload }
    })



}

export default handleActions(reducerMap, initialState);