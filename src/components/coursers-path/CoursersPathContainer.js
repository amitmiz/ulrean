
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { userCoursesProgressSelector } from '../../state/courses-progress/reducer.js';
import { courseSelector } from '../../state/courses/reducer.js';
import { pathSelector } from '../../state/predefiend-path/reducer.js';
import { stageSelector } from '../../state/stages/reducer.js';
import { loggedInUserSelector } from '../../state/users/user.reducer.js';
import CoursePath from './CoursePath.js';


const styles = (theme) => ({


    courseCard: {
        margin: '10px'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
})





const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

class CoursersPathContainer extends React.Component {



    componentDidMount() {
        // this.props.fetchPath()
    }


    render() {

        return (
            <CoursePath {...this.props} userPath={this.props.path} />
        )
    }






}

function generatePathToView(state) {
    const id = loggedInUserSelector(state).path;

    if (id) {
        const path = pathSelector(id, state);
        const denormalizedPath = { ...path };
        denormalizedPath.courses = denormalizedPath.courses.map(courseId => courseSelector(courseId, state))
        denormalizedPath.courses = denormalizedPath.courses.map(course => ({ ...course, stages: course.stages.map(stageId => stageSelector(stageId, state)) }));

        return denormalizedPath;
    } else {
        return null;
    }
}

const mapStateToProps = createSelector(
    [loggedInUserSelector,
        generatePathToView,
        userCoursesProgressSelector],
    (currentUser, path, progress) => {
        const maxCompletedCourseIndex = calculateMaxCourse(path.courses, progress)
        const lastCourse = path.courses[(maxCompletedCourseIndex + 1) % path.courses.length]
        return { currentUser, path, maxCompletedCourseIndex, lastCourse }
    }
)


function calculateMaxCourse(courses, progress) {
    let completedCourses = courses.map(course => progress[course._id].completed);
    return completedCourses.lastIndexOf(true)
}



const styled = withStyles(styles, { withTheme: true })(CoursersPathContainer);
const connected = connect(mapStateToProps, mapDispatchToProps)(styled);
connected.displayName = "CourseCatalog"
export default connected;

