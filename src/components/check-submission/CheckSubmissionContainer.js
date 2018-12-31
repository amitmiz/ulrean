import React from 'react'
import { connect } from 'react-redux';
import { makesSubmissionSelector, makeUserStageSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { mapSubmission } from '../../state/selectors';
import CheckSubmission from './CheckSubmission';


function mapStateToProps(state, ownProps) {
    const normalizedSubmission = makesSubmissionSelector(ownProps.match.params.id)(state);
    const submission = mapSubmission(normalizedSubmission, state)
    const normalizedSubmissions = makeUserStageSubmissionsSelector({ user: normalizedSubmission.user, stage: normalizedSubmission.stage })(state);
    const submissions = normalizedSubmissions.map(sub => mapSubmission(sub, state))



    return ({ submissions, currentSubmission: submission })

}

@connect(mapStateToProps)
class CheckSubmissionContainer extends React.Component {


    render() {
        const { currentSubmission, submissions } = this.props;


        return <CheckSubmission submissions={submissions} currentSubmission={currentSubmission} />
    }
}

export default CheckSubmissionContainer;