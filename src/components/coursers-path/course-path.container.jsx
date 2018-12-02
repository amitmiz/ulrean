
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApiClient } from '../../api-client.js';
import { courseSelector } from '../../state/courses/reducer.js';
import { pathSelector } from '../../state/predefiend-path/reducer.js';
import { stageSelector } from '../../state/stages/reducer.js';
import { loggedInUserSelector } from '../../state/users/user.reducer.js';
import { Loading } from '../utils.jsx';
import { CourseCatalog } from './course-path.jsx';


const styles = (theme) => ({


    courseCard: {
        margin: '10px'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
})

const mapStateToProps = state => {
    return {
        currentUser: loggedInUserSelector(state),
        path: generatePathToView(state)
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


const generatePathToView = (state) => {
    const id = loggedInUserSelector(state).path;

    if (id) {
        const path = pathSelector(id, state);
        const denormalizedPath = { ...path };
        denormalizedPath.courses = denormalizedPath.courses.map(courseId => courseSelector(courseId, state))
        denormalizedPath.courses = denormalizedPath.courses.map(course => ({ ...course, stages: course.stages.map(stageId => stageSelector(stageId, state)) }));

        return denormalizedPath;
    } else {
        return null;
    }


}



class CoursersCatalogContainer extends React.Component {



    componentDidMount() {
        // this.props.fetchPath()
    }


    render() {

        return (
            <CourseCatalog {...this.props} userPath={this.props.path} />
        )
    }






}

const styled = withStyles(styles, { withTheme: true })(CoursersCatalogContainer);
const connected = connect(mapStateToProps, mapDispatchToProps)(styled);
connected.displayName = "CourseCatalog"
export { connected as CoursersCatalogContainer };

