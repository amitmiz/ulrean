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
        return Axios.put(`http://${location.hostname}:8000/api/submissions/${submissionsId}`, { submission: { testResult: review } },{withCredentials : true})
    }




    static getAllUsers() {
        return users;
    }



    static getAllCourses() {
        return staticCoureses;
    }

    static getCourseById(id) {
        return staticCoureses.filter(course => course._id == id)[0]
    }

    static getUserById(id) {
        return users.filter(user => user._id == id)[0]
    }

    static getUserPath(id) {
        return ApiClient.getUserById(id).path
    }

    // should be in a store
    static updateUsersPath(userId, path) {
        ApiClient.getUserById(userId).path = path;


    }

    static getPathlessStudents() {
        return ApiClient.getStudents().filter(user => !user.path)
    }

    static getPredefiendPaths() {
        return predefinedPaths;
    }

    static getTeachers() {
        return ApiClient.getAllUsers().filter(user => user.type === "teacher")
    }

    static getStudents() {
        return ApiClient.getAllUsers().filter(user => user.type === "student")
    }

    static getRecentQuestions() {
        return questions;
    }

    static getStageById(id) {
        return stages.filter(stage => stage.id == id)[0];
    }
}

