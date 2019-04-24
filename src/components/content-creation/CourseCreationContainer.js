import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mappedCoursesSelector } from '../../state/selectors';
import { stagesSelector } from '../../state/stages/reducer';
import CourseCreation from './CourseCreation';
import { fetchCourses, addNewCourse } from '../../state/courses/reducer'


const mapStateToProps = state => ({
    courses: mappedCoursesSelector(state),
    stages: stagesSelector(state)
})


const mapDispatchToProps = dispatch => bindActionCreators({ fetchCourses, addNewCourse }, dispatch);

class CourseCreationContainer extends React.Component {

    componentDidMount() {
        this.props.fetchCourses();
    }

    render() {
        return (<CourseCreation {...this.props} />)
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(CourseCreationContainer);

export default connected;

