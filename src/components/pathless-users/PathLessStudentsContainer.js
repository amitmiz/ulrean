import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { pathlessUsersSelector, usersApiSelector } from "../../state/users/reducer";
import PathLessStudents from "./PathLessStudents";
import {fetchUsers} from "../../state/users/actions"


const mapStateToProps = state => ({
    isLoading: usersApiSelector(state).isLoading,
    users: pathlessUsersSelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({fetchUsers}, dispatch)

class PathLessStudentsContainer extends React.Component {

    componentDidMount() {
        this.props.fetchUsers()
    }

    render() {

        const { isLoading, users } = this.props;

        return (
            isLoading ? "Loading" : <PathLessStudents users={users} />
        )
    }
}





const connected = connect(mapStateToProps, mapDispatchToProps)(PathLessStudentsContainer)

export default connected;
