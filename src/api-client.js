import { users, staticCoureses, predefinedPaths } from "./static-data";

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
        return ApiClient.getAllUsers().filter(user => !user.path)
    }

    static getPredefiendPaths() {
        return predefinedPaths;
    }
}
