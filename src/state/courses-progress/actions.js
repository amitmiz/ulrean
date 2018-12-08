import { createAction } from 'redux-actions';

export const types = {
    updateCourseProgressRequested: "SAVE_COURSE_PROGRESS_REQUESTED",
    updateCourseProgressSuccess: "SAVE_COURSE_PROGRESS_SUCCESS",
    updateCourseProgressError: "SAVE_COURSE_PROGRESS_ERROR"
}

export const updateCourseProgressRequested = createAction(types.updateCourseProgressRequested)
export const updateCourseProgressSuccess = createAction(types.updateCourseProgressSuccess)
export const updateCourseProgressError = createAction(types.updateCourseProgressError)