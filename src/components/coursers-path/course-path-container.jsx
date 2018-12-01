
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApiClient } from '../../api-client.js';
import { pathSelector } from '../../state/course-path/reducer.js';
import { userSelector } from '../../state/users/user.reducer.js';
import { Loading } from '../utils.jsx';
import { CourseCatalog } from './course-path.jsx';
import { fetchPath } from '../../state/course-path/actions';


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
        currentUser: userSelector(state),
        path: pathSelector(state)
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPath }, dispatch);



class CoursersCatalogContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    componentDidMount() {
        this.props.fetchPath()

    }


    render() {
        const currentCoursePath = ApiClient.getUserPath(this.props.currentUser._id);

        return (
            this.state.loading ? <Loading /> : <CourseCatalog {...this.props} userPath={currentCoursePath} />
        )
    }






}

const styled = withStyles(styles, { withTheme: true })(CoursersCatalogContainer);
const connected = connect(mapStateToProps, mapDispatchToProps)(styled);
connected.displayName = "CourseCatalog"
export { connected as CoursersCatalogContainer };

