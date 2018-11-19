import { ADD_ARTICLE } from "./action-types";

export const addArticle = article => ({ type: ADD_ARTICLE, payload: article });