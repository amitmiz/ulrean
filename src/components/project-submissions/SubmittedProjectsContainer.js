import React from 'react';
import { connect } from 'react-redux';
import { unhandledSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { mapSubmission } from '../../state/selectors';
import SubmittedProjects from './SubmittedProjects';



const mapStateToProps = state => ({
    submissions: mapSubmissions(state)
})

const mapSubmissions = (state) => {

    const submissions = unhandledSubmissionsSelector(state);

    return submissions.map(submission => mapSubmission(submission, state))

};

@connect(mapStateToProps)
class SubmittedProjectsContainer extends React.Component {

    render() {
        const { submissions } = this.props;

        return (<SubmittedProjects submissions={submissions} />)

    }

}

export default SubmittedProjectsContainer;