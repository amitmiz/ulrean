import { handleActions } from "redux-actions";

const ns = "courses"

const initialState = {
    api: {},
    models: {
        "1111": {
            _id: "1111",
            header: "Basic HTML and HTML5",
            subheader: "Master the languages of the web: HTML, CSS, JavaScript, and SQL. This path is great for budding front-end or back-end engineers!",
            tags: ["html", "css", "javascript"],
            stages: ["12312312333123", "12321"]
        },
        "12312": {
            _id: "12312",
            header: "Data Science",
            subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
            tags: ["pyhton", "sql"],
            stages: ["12312312333123"]
        },
        "12312312": {
            _id: "12312312",
            header: "Data Bases",
            subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
            tags: ["pyhton", "sql"],
            stages: ["12312312333123"]
        }
    }
}

export const courseSelector = (id, state) => state[ns].models[id]
export const makeCourseSelector = (id) => (state) => state[ns].models[id]


const reducerMap = {};


export default handleActions(reducerMap, initialState)



