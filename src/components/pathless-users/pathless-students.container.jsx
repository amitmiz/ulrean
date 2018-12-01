import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { fetchPathlessUser } from "../../pathless-users/actions";
import { isPathlessUsersLoadingSelector, pathLessUsersSelector, pathlessUsersErrorSelector } from "../../pathless-users/reducer";
import { PathLessStudents } from "./pathless-students.component";


const mapStateToProps = createSelector(
    isPathlessUsersLoadingSelector,
    pathlessUsersErrorSelector,
    pathLessUsersSelector,
    (isLoading, error, users) => ({ isLoading, error, users }));

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPathlessUser }, dispatch)



class PathLessStudentsContainer extends React.Component {

    componentDidMount() {
        this.props.fetchPathlessUser()
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
