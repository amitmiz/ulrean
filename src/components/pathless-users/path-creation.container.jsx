import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { courseSelector } from '../../state/courses/reducer';
import { allPathsSelector } from '../../state/predefiend-path/reducer';
import { userSelector } from '../../state/users/user.reducer';
import { PathCreation } from './path-creation';
import {addPath} from '../../state/users/users.actions';


const mapStateToProps = (state, ownProps) => ({ currentUser: userSelector(state, ownProps.match.params.id), paths: generatePredefiendPaths(state) });

const mapDispatchToProps = dispatch => bindActionCreators({ addPath }, dispatch)

const generatePredefiendPaths = (state) => {
    const allPaths = allPathsSelector(state);
    return allPaths.map(path => ({ ...path, courses: path.courses.map(courseId => courseSelector(courseId, state)) }))
}

class PathCreationContainer extends React.Component {


    render() {


        return (<PathCreation {...this.props} />)
    }


}

const connected = connect(mapStateToProps, mapDispatchToProps)(PathCreationContainer);

export { connected as PathCreationContainer };

