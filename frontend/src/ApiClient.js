/* eslint-disable no-restricted-globals */
import { users, staticCoureses, predefinedPaths, teachers, questions, stages } from "./static-data";
import Axios from "axios";

export class ApiClient {

    static register(user) {
        return Axios.post(`https://${location.hostname}/api/users`, { "user": user });
    }

    static login(email, password) {
        return Axios.post(`https://${location.hostname}/api/users/login`, { "user": { email, password } }, { withCredentials: true });
    }

    static fetchCurrUser() {
        return Axios.get(`https://${location.hostname}/api/user`, { withCredentials: true });
    }

    static fetchUsers() {
        return Axios.get(`https://${location.hostname}/api/`);
    }

    static fetchCourses() {
        return Axios.get(`https://${location.hostname}/api/courses`);
    }

    static addCourse(course) {
        return Axios.post(`https://${location.hostname}/api/courses`, { course }, { withCredentials: true });
    }

    static fetchStages() {
        return Axios.get(`https://${location.hostname}/api/stages`);
    }

    static addStage(stage) {
        return Axios.post(`https://${location.hostname}/api/stages`, { stage }, { withCredentials: true });
    }

    static fetchPredefiendPaths() {
        return Axios.get(`https://${location.hostname}/api/predefiend-pathes`);
    }

    static addNewPath(path) {
        return Axios.post(`https://${location.hostname}/api/predefiend-pathes`, { predefiendPath: path }, { withCredentials: true });
    }

    static fetchQuestions() {
        return Axios.get(`https://${location.hostname}/api/questions`)
    }

    static fetchQuestion(_id) {
        return Axios.get(`https://${location.hostname}/api/questions/${_id}`)
    }


    static postQuestion(question) {
        return Axios.post(`https://${location.hostname}/api/questions`, { question: question }, { withCredentials: true })
    }

    static postComment(question_id, reply) {
        return Axios.post(`https://${location.hostname}/api/questions/${question_id}/comments`, { comment: reply }, { withCredentials: true })
    }

    static updateProgress({ course_id, stage }) {
        return Axios.put(`https://${location.hostname}/api/progress/${course_id}`, { courseProgress: { stagesCompleted: stage } }, { withCredentials: true })
    }

    static updatePath({ userId, pathId }) {
        return Axios.put(`https://${location.hostname}/api/user/${userId}`, { user: { path: pathId } }, { withCredentials: true })
    }


    static updateUser({ userId, update }) {
        return Axios.put(`https://${location.hostname}/api/user/${userId}`, { user: update }, { withCredentials: true })
    }

    static logout() {
        return Axios.post(`https://${location.hostname}/api/users/logout`, null, { withCredentials: true })
    }

    static fetchSubmissions() {
        return Axios.get(`https://${location.hostname}/api/submissions`, { withCredentials: true })
    }


    static fetchStageSubmissions(stage) {
        return Axios.get(`https://${location.hostname}/api/submissions/stage/${stage}`, { withCredentials: true })
    }

    static postSubmission(submission) {
        return Axios.post(`https://${location.hostname}/api/submissions`, { submission }, { withCredentials: true })
    }

    static reviewSubmission(submissionsId, review) {
        return Axios.put(`https://${location.hostname}/api/submissions/${submissionsId}`, { submission: { testResult: review } }, { withCredentials: true })
    }




    /** Statistics */


    static usersPastDueDate() {
        return Axios.get(`https://${location.hostname}/api/stats/usersPastDueDate`).then(x => x.data)
    }


    static unfinishedPathUsers() {
        return Axios.get(`https://${location.hostname}/api/stats/unfinishedPathUsers`).then(x => x.data)
    }


    static finishedPathUsers() {
        return Axios.get(`https://${location.hostname}/api/stats/finishedPathUsers`).then(x => x.data)
    }

    static teacherStundentsCount() {
        return Axios.get(`https://${location.hostname}/api/stats/teacherStundentsCount`).then(x => x.data)
    }
}

