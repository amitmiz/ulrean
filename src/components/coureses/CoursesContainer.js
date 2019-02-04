import React from 'react'
import { connect } from 'react-redux';
import { mappedCoursesSelector } from '../../state/selectors';
import { fetchCourses } from '../../state/courses/reducer'
import Courses from './Courses';
import { bindActionCreators } from 'redux';



const mapStateToProps = state => ({
    courses: mappedCoursesSelector(state)
})


const mapDispatchToProps = dispatch => bindActionCreators({ fetchCourses }, dispatch);





@connect(mapStateToProps, mapDispatchToProps)
class CoursesContainer extends React.Component {


    componentDidMount() {
        this.props.fetchCourses()
    }

    render() {
        return (<Courses courses={this.props.courses} />)
    }

}

export default CoursesContainer;