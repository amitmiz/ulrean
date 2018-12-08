import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { pathlessUsersSelector, usersApiSelector } from "../../state/users/user.reducer";
import PathLessStudents from "./PathLessStudents";


const mapStateToProps = state => ({
    isLoading: usersApiSelector(state).isLoading,
    users: pathlessUsersSelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

class PathLessStudentsContainer extends React.Component {

    componentDidMount() {
        // this.props.fetchPathlessUser()
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
