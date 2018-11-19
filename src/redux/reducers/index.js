import { ADD_ARTICLE } from "../actions/action-types";
import { predefinedPaths, questions, staticCoureses, users } from "../../static-data";

const initialState = {
    articles: [],
    courses: staticCoureses,
    predefinedPaths : predefinedPaths,
    questions : questions,
    users : users,
    currentUser : users[0]
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARTICLE:
            return { ...state, articles: [...state.articles, action.payload] };
        default:
            return state;
    }
};
export default rootReducer;