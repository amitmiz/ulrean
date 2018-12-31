import { createAction } from "redux-actions";

export const types = {
    postQuestion: "QA/POST_QUESTION",
    postQuestionSuccess: "QA/POST_QUESTION_SUCCESS",
    postQuestionError: "QA/POST_QUESTION_ERROR",


    postReply: "QA/POST_REPLY",
    postReplySuccess: "QA/POST_REPLY_SUCCESS",
    postReplyError: "QA/POST_REPLY_ERROR"


}

export const postQuestion = createAction(types.postQuestion)
export const postQuestionSuccess = createAction(types.postQuestionSuccess)
export const postQuestionError = createAction(types.postQuestionError)

export const postReply = createAction(types.postReply)
export const postReplySuccess = createAction(types.postReplySuccess)
export const postReplyError = createAction(types.postReplyError)