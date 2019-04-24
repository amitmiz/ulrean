/* eslint-disable no-restricted-globals */
import { users, staticCoureses, predefinedPaths, teachers, questions, stages } from "./static-data";
import Axios from "axios";

export class ApiClient {

    static register(user) {
        return Axios.post(`http://${location.hostname}:8000/api/users`, { "user": user });
    }

    static login(email, password) {
        return Axios.post(`http://${location.hostname}:8000/api/users/login`, { "user": { email, password } }, { withCredentials: true });
    }

    static fetchCurrUser() {
        return Axios.get(`http://${location.hostname}:8000/api/user`, { withCredentials: true });
    }

    static fetchUsers() {
        return Axios.get(`http://${location.hostname}:8000/api/`);
    }

    static fetchCourses() {
        return Axios.get(`http://${location.hostname}:8000/api/courses`);
    }

    static addCourse(course) {
        return Axios.post(`http://${location.hostname}:8000/api/courses`, { course }, { withCredentials: true });
    }

    static fetchStages() {
        return Axios.get(`http://${location.hostname}:8000/api/stages`);
    }

    static addStage(stage) {
        return Axios.post(`http://${location.hostname}:8000/api/stages`, { stage }, { withCredentials: true });
    }

    static fetchPredefiendPaths() {
        return Axios.get(`http://${location.hostname}:8000/api/predefiend-pathes`);
    }

    static addNewPath(path) {
        return Axios.post(`http://${location.hostname}:8000/api/predefiend-pathes`, { predefiendPath: path }, { withCredentials: true });
    }

    static fetchQuestions() {
        return Axios.get(`http://${location.hostname}:8000/api/questions`)
    }

    static fetchQuestion(_id) {
        return Axios.get(`http://${location.hostname}:8000/api/questions/${_id}`)
    }


    static postQuestion(question) {
        return Axios.post(`http://${location.hostname}:8000/api/questions`, { question: question }, { withCredentials: true })
    }

    static postComment(question_id, reply) {
        return Axios.post(`http://${location.hostname}:8000/api/questions/${question_id}/comments`, { comment: reply }, { withCredentials: true })
    }

    static updateProgress({ course_id, stage }) {
        return Axios.put(`http://${location.hostname}:8000/api/progress/${course_id}`, { courseProgress: { stagesCompleted: stage } }, { withCredentials: true })
    }

    static updatePath({ userId, pathId }) {
        return Axios.put(`http://${location.hostname}:8000/api/user/${userId}`, { user: { path: pathId } }, { withCredentials: true })
    }


    static updateUser({ userId, update }) {
        return Axios.put(`http://${location.hostname}:8000/api/user/${userId}`, { user: update }, { withCredentials: true })
    }

    static logout() {
        return Axios.post(`http://${location.hostname}:8000/api/users/logout`, null, { withCredentials: true })
    }

    static fetchSubmissions() {
        return Axios.get(`http://${location.hostname}:8000/api/submissions`, { withCredentials: true })
    }


    static fetchStageSubmissions(stage) {
        return Axios.get(`http://${location.hostname}:8000/api/submissions/stage/${stage}`, { withCredentials: true })
    }

    static postSubmission(submission) {
        return Axios.post(`http://${location.hostname}:8000/api/submissions`, { submission }, { withCredentials: true })
    }

    static reviewSubmission(submissionsId, review) {
        return Axios.put(`http://${location.hostname}:8000/api/submissions/${submissionsId}`, { submission: { testResult: review } }, { withCredentials: true })
    }




    /** Statistics */


    static usersPastDueDate() {
        return Axios.get(`http://${location.hostname}:8000/api/stats/usersPastDueDate`).then(x => x.data)
    }


    static unfinishedPathUsers() {
        return Axios.get(`http://${location.hostname}:8000/api/stats/unfinishedPathUsers`).then(x => x.data)
    }


    static finishedPathUsers() {
        return Axios.get(`http://${location.hostname}:8000/api/stats/finishedPathUsers`).then(x => x.data)
    }

    static teacherStundentsCount() {
        return Axios.get(`http://${location.hostname}:8000/api/stats/teacherStundentsCount`).then(x => x.data)
    }
}

