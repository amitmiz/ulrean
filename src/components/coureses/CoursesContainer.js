import React from 'react'
import { connect } from 'react-redux';
import { mappedCoursesSelector } from '../../state/selectors';
import Courses from './Courses';



const mapStateToProps = state => ({
    courses: mappedCoursesSelector(state)
})

@connect(mapStateToProps)
class CoursesContainer extends React.Component {

    render() {
        return (<Courses courses={this.props.courses} />)
    }

}

export default CoursesContainer;