import { handleActions } from 'redux-actions';
import { types } from './actions';

const ns = "coursesProgress"

export const makeCourseCompletionProgressSelector = (id) => (state) => state[ns].models[id];

export const userCoursesProgressSelector = state => state[ns].models;

const initialState = {
    api: { isLoading: false, error: null },
    models: {
        "1111": {
            courseId: "1111",
            userId: "123123",
            started: new Date(),
            completed: false,
            stagesCompleted: 0
        },
        "12312": {
            courseId: "12312",
            userId: "123123",
            started: new Date(),
            completed: false,
            stagesCompleted: 0
        },
        "12312312": {
            courseId: "12312312",
            userId: "123123",
            started: new Date(),
            completed: false,
            stagesCompleted: 0
        }
    }
};


const updateProgress = (models, id, update) => {
    return { ...models, [id]: { ...models[id], ...update } };
}

const reducerMap = {

    [types.updateCourseProgressRequested]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.updateCourseProgressSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }, models: updateProgress(state.models, payload.courseId, payload.newProgress)
    }),
    [types.updateCourseProgressError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })



};


export default handleActions(reducerMap, initialState);