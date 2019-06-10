import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { studentsSelector, usersApiSelector } from "../../state/users/reducer";
import StudentsList from "./StudentsList";
import { fetchUsers } from "../../state/users/actions"
import { ApiClient } from "../../ApiClient";
import { makeCourseSelector, coursesSelector } from "../../state/courses/reducer";
import { stagesSelector } from "../../state/stages/reducer";


const mapStateToProps = state => ({
    isLoading: usersApiSelector(state).isLoading,
    courses: coursesSelector(state),
    stages: stagesSelector(state),
    users: studentsSelector(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchUsers }, dispatch)

class StudentsListContainer extends React.Component {


    constructor(props) {
        super(props);

        this.state = { usersData: null }
    }

    generateStudentData() {

    }

    componentDidMount() {
        this.props.fetchUsers()

        Promise.all([
            ApiClient.usersPastDueDate(),
            ApiClient.unfinishedPathUsers(),
            ApiClient.finishedPathUsers(),
        ]).then(data =>
            this.setState({ usersData: { passedDueDate: data[0], unfinishedPath: data[1], finishedPath: data[2] } }))

    }



    render() {

        const { isLoading, users, courses, stages } = this.props;

        return (
            (isLoading || !this.state.usersData) ? "Loading" : <StudentsList stages={stages} courses={courses} users={users} usersData={this.state.usersData} />
        )
    }
}





const connected = connect(mapStateToProps, mapDispatchToProps)(StudentsListContainer)

export default connected;
