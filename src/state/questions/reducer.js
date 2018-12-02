import { handleActions } from 'redux-actions';

const ns = "questions"

const initialState = {

    api: {},
    models: {
        "asdasd": {
            _id: "asdasd",
            header: "Question1",
            content: "asdasdasd",
            author: "123123434",
            tags: ["pyhton", "sql"]
        },
        "aasddd": {
            _id: "aasddd",
            header: "Question1",
            content: "asdasdasd",
            tags: ["pyhton", "sql"],
            author: "123123434"
        },
        "asdasdddd": {
            _id: "asdasdddd",
            header: "Question1",
            content: "asdasdasd",
            tags: ["pyhton", "sql"],
            author: "123123434"
        }
    }
}


export const questionsSelector = state => Object.keys(state[ns].models).map(key => state[ns].models[key])

const reducerMap = {}

export default handleActions(reducerMap, initialState);