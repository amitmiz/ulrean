import React from 'react'
import { connect } from 'react-redux';
import { makesSubmissionSelector, makeUserStageSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { mapSubmission } from '../../state/selectors';
import CheckSubmission from './CheckSubmission';
import { bindActionCreators } from 'redux';
import { reviewSubmission } from '../../state/projects-submissions/actions';


function mapStateToProps(state, ownProps) {
    const normalizedSubmission = makesSubmissionSelector(ownProps.match.params.id)(state);
    const submission = mapSubmission(normalizedSubmission, state)
    const normalizedSubmissions = makeUserStageSubmissionsSelector({ user: normalizedSubmission.user, stage: normalizedSubmission.stage })(state);
    const submissions = normalizedSubmissions.map(sub => mapSubmission(sub, state))



    return ({ submissions, currentSubmission: submission })

}


const mapDispatchToProps = (dispatch) => bindActionCreators({ reviewSubmission }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
class CheckSubmissionContainer extends React.Component {


    render() {
        const { currentSubmission, submissions, reviewSubmission } = this.props;


        return <CheckSubmission submissions={submissions} currentSubmission={currentSubmission} reviewSubmission={reviewSubmission} />
    }
}

export default CheckSubmissionContainer;