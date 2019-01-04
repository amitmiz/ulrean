import { createAction } from 'redux-actions'

export const types = {
    submitProject: "SUBMIT_PROJECT",
    submitProjectSuccess: "SUBMIT_PROJECT_SUCCESS",
    submitProjectError: "SUBMIT_PROJECT_ERROR",
    reviewSubmission: "REVIEW_SUBMISSION",
    reviewSubmissionSuccess: "REVIEW_SUBMISSION_SUCCESS",
    reviewSubmissionError: "REVIEW_SUBMISSION_ERROR"
}

export const submitProject = createAction(types.submitProject)
export const submitProjectSuccess = createAction(types.submitProjectSuccess)
export const submitProjectError = createAction(types.submitProjectError)

export const reviewSubmission = createAction(types.reviewSubmission)
export const reviewSubmissionSuccess = createAction(types.reviewSubmissionSuccess)
export const reviewSubmissionError = createAction(types.reviewSubmissionError)
