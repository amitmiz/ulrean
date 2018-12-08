import { createAction } from 'redux-actions'

export const types = {
    submitProject : "SUBMIT_PROJECT",
    submitProjectSuccess : "SUBMIT_PROJECT_SUCCESS",
    submitProjectError : "SUBMIT_PROJECT_ERROR"
}

export const submitProject = createAction(types.submitProject)
export const submitProjectSuccess = createAction(types.submitProjectSuccess)
export const submitProjectError = createAction(types.submitProjectError)