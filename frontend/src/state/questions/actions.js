import { createAction } from "redux-actions";

export const types = {
    postQuestion: "QA/POST_QUESTION",
    postQuestionSuccess: "QA/POST_QUESTION_SUCCESS",
    postQuestionError: "QA/POST_QUESTION_ERROR",



    fetchQuestion: "FETCH_QUESTION",
    fetchQuestions: "FETCH_QUESTIONS"


}

export const postQuestion = createAction(types.postQuestion)
export const postQuestionSuccess = createAction(types.postQuestionSuccess)
export const postQuestionError = createAction(types.postQuestionError)

export const fetchQuestions = createAction(types.fetchQuestions);
export const fetchQuestion = createAction(types.fetchQuestion);