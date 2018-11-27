import { users, staticCoureses, predefinedPaths, teachers, questions, stages } from "./static-data";

export class ApiClient {

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

