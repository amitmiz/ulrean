
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pathStatsSelector } from '../../state/selectors.js';
import CoursePath from './CoursePath.js';
import { fetchPaths } from '../../state/predefiend-path/actions';

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPaths }, dispatch);
const mapStateToProps = pathStatsSelector




@connect(mapStateToProps, mapDispatchToProps)
class CoursersPathContainer extends React.Component {
    componentDidMount() {
       this.props.fetchPaths();
    }

    render() {
        return (
            <CoursePath {...this.props} userPath={this.props.path} />
        )
    }
}






export default CoursersPathContainer;

