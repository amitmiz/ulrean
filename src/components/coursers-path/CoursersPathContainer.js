
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pathStatsSelector } from '../../state/selectors.js';
import CoursePath from './CoursePath.js';

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = pathStatsSelector


@connect(mapStateToProps, mapDispatchToProps)
class CoursersPathContainer extends React.Component {
    render() {
        return (
            <CoursePath {...this.props} userPath={this.props.path} />
        )
    }
}






export default CoursersPathContainer;

