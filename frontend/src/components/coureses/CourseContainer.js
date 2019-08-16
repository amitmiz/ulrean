import React from 'react';
import { connect } from 'react-redux';
import { makeMappedCourseSelector } from '../../state/selectors';
import Course from './Course';
import { loggedInUserSelector } from '../../state/users/reducer';



const mapStateToProps = (state, ownProps) => ({
    course: makeMappedCourseSelector(ownProps.match.params.id)(state),
 
})

@connect(mapStateToProps)
class CourseContainer extends React.Component {

    render() {
        return (<Course {...this.props} />)
    }

}

export default CourseContainer;