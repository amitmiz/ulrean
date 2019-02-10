import { createAction } from "redux-actions";

export const types = {

    fetchCommentsForQuestion : "QA/FETCH_COMMENTS_FOR_QUESTION",
    postComment: "QA/POST_COMMENT",
    postCommentSuccess: "QA/POST_COMMENT_SUCCESS",
    postCommentError: "QA/POST_COMMENT_ERROR",
}



export const postComment = createAction(types.postComment)
export const postCommentSuccess = createAction(types.postCommentSuccess)
export const postCommentError = createAction(types.postCommentError)


