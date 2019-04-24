import React from 'react'
import { connect } from 'react-redux';
import { mappedCoursesSelector } from '../../state/selectors';
import { fetchCourses,  } from '../../state/courses/reducer';
import { fetchStages  } from '../../state/stages/reducer';
import Courses from './Courses';

import { bindActionCreators } from 'redux';
import { stagesSelector } from '../../state/stages/reducer';
import { loggedInUserSelector } from '../../state/users/reducer';



const mapStateToProps = state => ({
    courses: mappedCoursesSelector(state),
    stages: stagesSelector(state),
    currentUser: loggedInUserSelector(state)
})


const mapDispatchToProps = dispatch => bindActionCreators({ fetchCourses,fetchStages }, dispatch);





@connect(mapStateToProps, mapDispatchToProps)
class CoursesContainer extends React.Component {


    componentDidMount() {
        this.props.fetchCourses();
        this.props.fetchStages();
    }

    render() {
        return (<Courses {...this.props} />)
    }

}

export default CoursesContainer;