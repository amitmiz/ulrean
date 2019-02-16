import React from 'react';
import { connect } from 'react-redux';
import { unhandledSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { mapSubmission } from '../../state/selectors';
import SubmittedProjects from './SubmittedProjects';
import { bindActionCreators } from 'redux';

import { fetchSubmissions } from '../../state/projects-submissions/actions'




const mapStateToProps = state => ({
    submissions: mapSubmissions(state)
})

const mapSubmissions = (state) => {

    const submissions = unhandledSubmissionsSelector(state);

    return submissions.map(submission => mapSubmission(submission, state))

};

const mapDistachToProps = dispatch => bindActionCreators({ fetchSubmissions }, dispatch)

@connect(mapStateToProps, mapDistachToProps)
class SubmittedProjectsContainer extends React.Component {

    componentDidMount() {
        this.props.fetchSubmissions();
    }

    render() {
        const { submissions } = this.props;

        return (<SubmittedProjects submissions={submissions} />)

    }

}

export default SubmittedProjectsContainer;