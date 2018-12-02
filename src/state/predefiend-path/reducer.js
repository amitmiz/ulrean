import { handleActions } from 'redux-actions';

const ns = "paths"

const initialState = {
    api: {},
    models: {
        "1212": {
            _id: "1212",
            name: "frontend",
            courses: ["1111", "12312"]
        },
        "1231":
        {
            _id: "1231",
            name: "backend",
            courses: ["12312", "12312312"]
        }


    }
}

export const pathSelector = (id, state) => state[ns].models[id];
export const allPathsSelector = (state) => Object.keys(state[ns].models).map(key => state[ns].models[key]);

const reducerMap = {}

export default handleActions(reducerMap, initialState);