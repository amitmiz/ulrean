/* eslint-disable no-restricted-globals */
import { users, staticCoureses, predefinedPaths, teachers, questions, stages } from "./static-data";
import Axios from "axios";

export class ApiClient {

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

    static fetchQuestion(slug) {
        return Axios.get(`http://${location.hostname}:8000/api/questions/${slug}`)
    }


    static postQuestion(question) {
        return Axios.post(`http://${location.hostname}:8000/api/questions`, { question: question }, { withCredentials: true })
    }

    static postComment(questionSlug, reply) {
        return Axios.post(`http://${location.hostname}:8000/api/questions/${questionSlug}/comments`, { comment: reply }, { withCredentials: true })
    }

    static updateProgress({ courseSlug, stage }) {
        return Axios.put(`http://${location.hostname}:8000/api/progress/${courseSlug}`, { courseProgress: { stagesCompleted: stage } }, { withCredentials: true })
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

