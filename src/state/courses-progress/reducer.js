
import { createAction, handleActions } from 'redux-actions';
import { ADD_ENTITIES } from '../../redux/actions';

const ns = "coursesProgress"


export const types = {
    updateCourseProgressRequested: "SAVE_COURSE_PROGRESS_REQUESTED",
    updateCourseProgressSuccess: "SAVE_COURSE_PROGRESS_SUCCESS",
    updateCourseProgressError: "SAVE_COURSE_PROGRESS_ERROR"
}

export const updateCourseProgressRequested = createAction(types.updateCourseProgressRequested)
export const updateCourseProgressSuccess = createAction(types.updateCourseProgressSuccess)
export const updateCourseProgressError = createAction(types.updateCourseProgressError)


export const makeCourseCompletionProgressSelector = (id) => (state) => state[ns].models[id];

export const userCoursesProgressSelector = state => state[ns].models;

export const makeCurrentStageIndexSelector = courseId => state => state[ns].models[courseId].stagesCompleted

const initialState = {
    api: { isLoading: false, error: null },
    models: {}

};


const updateProgress = (models, id, update) => {
    return { ...models, [id]: { ...models[id], ...update } };
}

const reducerMap = {
    [ADD_ENTITIES]: (state, { payload }) => ({
        ...state, models: { ...state.models, ...payload.coursesProgress }
    }),

    [types.updateCourseProgressRequested]: (state, { payload }) => ({
        ...state, api: { isLoading: true, error: null }
    }),
    [types.updateCourseProgressSuccess]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: null }, models: updateProgress(state.models, payload.course, payload.newProgress)
    }),
    [types.updateCourseProgressError]: (state, { payload }) => ({
        ...state, api: { isLoading: false, error: payload }
    })



};


export default handleActions(reducerMap, initialState);