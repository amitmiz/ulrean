import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { courseSelector, coursesSelector } from '../../state/courses/reducer';
import { addNewPath, fetchPaths } from '../../state/predefiend-path/actions';
import { allPathsSelector } from '../../state/predefiend-path/reducer';
import { userSelector } from '../../state/users/reducer';
import { addPath,fetchUsers } from '../../state/users/actions';

import PathCreation from './PathCreation';

const mapStateToProps = (state, ownProps) => ({
    courses: coursesSelector(state),
    currentUser: userSelector(state, ownProps.match.params.id),
    paths: generatePredefiendPaths(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPaths, addPath, addNewPath ,fetchUsers}, dispatch)

const generatePredefiendPaths = (state) => {
    const allPaths = allPathsSelector(state);
    return allPaths.map(path => ({ ...path, courses: path.courses.map(courseId => courseSelector(courseId, state)) }))
}

class PathCreationContainer extends React.Component {

    componentDidMount() {
        this.props.fetchPaths();
        this.props.fetchUsers();
    }

    render() {
        if (this.props.currentUser) {
            return (<PathCreation {...this.props} />)

        } else {
            return "loading"
        }

    }


}

const connected = connect(mapStateToProps, mapDispatchToProps)(PathCreationContainer);

export default connected;

