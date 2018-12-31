import { createSelector } from "reselect";
import { loggedInUserSelector, userSelector } from "./users/reducer";
import { userCoursesProgressSelector } from "./courses-progress/reducer";
import { makePathSelector } from "./predefiend-path/reducer";
import { courseSelector, coursesSelector, makeCourseSelector } from "./courses/reducer";
import { stageSelector } from "./stages/reducer";
import { questionsSelector } from "./questions/reducer";
import { unhandledSubmissionsSelector } from "./projects-submissions/reducer";

export const pathStatsSelector = createSelector(
    [
        loggedInUserSelector,
        generatePathToView,
        userCoursesProgressSelector,

    ],
    (currentUser, path, progress) => {

        const maxCompletedCourseIndex = lastCompletedCourse(path.courses, progress)

        const lastCourse = path.courses[(maxCompletedCourseIndex + 1) % path.courses.length]

        const lastStageIndex = progress[lastCourse._id].stagesCompleted;

        const lastStage = lastCourse.stages[lastStageIndex];

        return { currentUser, path, progress, maxCompletedCourseIndex, lastCourse, lastStage }
    }
)

export const mappedCoursesSelector = state => {
    return coursesSelector(state).map(course => mapCourse(state, course));
}

export const makeMappedCourseSelector = id => state => mapCourse(state, makeCourseSelector(id)(state))



export const questionsWithAutorSelector = (state) => {
    const questions = questionsSelector(state)
    return questions.map(question => ({ ...question, author: userSelector(state, question.author) }))

}


export const mapSubmission = (submission, state) => ({
    ...submission,
    user: userSelector(state, submission.user),
    stage: stageSelector(submission.stage, state),
    testResult: submission.testResult ? { ...submission.testResult, teacher: userSelector(state, submission.testResult.teacher) } : null

})


const mapCourse = (state, course) => ({ ...course, stages: course.stages.map(stageId => stageSelector(stageId, state)) });



function generatePathToView(state) {
    const id = loggedInUserSelector(state).path;

    if (id) {
        const path = makePathSelector(id)(state);
        const denormalizedPath = { ...path };
        denormalizedPath.courses = denormalizedPath.courses.map(courseId => courseSelector(courseId, state))
        denormalizedPath.courses = denormalizedPath.courses.map(course => ({ ...course, stages: course.stages.map(stageId => stageSelector(stageId, state)) }));

        return denormalizedPath;
    } else {
        return null;
    }
}



function lastCompletedCourse(courses, progress) {
    let completedCourses = courses.map(course => progress[course._id].completed);
    return completedCourses.lastIndexOf(true)
}
