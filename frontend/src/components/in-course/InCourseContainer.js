import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { makeCourseSelector } from '../../state/courses/reducer';
import { stageFilesSelector, stageTestsSelector, consoleOutputSelector, executeStage, updateFile, mountStage, currentMountedStage, stageComplete } from '../../state/stage-proccessor';
import { submitProject, fetchStageSubmissions } from '../../state/projects-submissions/actions';
import { makeStageSelector } from '../../state/stages/reducer';
import BottomNavBar from './components/BottomNavBar';
import { loggedInUserSelector } from '../../state/users/reducer';
import { makeUserStageSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { makeCourseCompletionProgressSelector } from '../../state/courses-progress/reducer';
import InCourseNav from './components/InCourseNav';
import ProjectStage from './ProjectStage';
import HtmlStage from './HtmlStage';
import JavaScriptStage from './JavaScriptStage';

import "./components/test-frame.css"


const mapStateToProps = (state, ownProps) => {

    const courseSelector = makeCourseSelector(ownProps.match.params.courseId)
    const stageSelector = makeStageSelector(ownProps.match.params.stageId)
    const courseProgressSelector = makeCourseCompletionProgressSelector(ownProps.match.params.courseId);

    const user = loggedInUserSelector(state);
    const submissionsSelector = makeUserStageSubmissionsSelector({ stage: ownProps.match.params.stageId, user: user._id })

    return createSelector([courseSelector, stageSelector, stageFilesSelector, stageTestsSelector, consoleOutputSelector, courseProgressSelector, currentMountedStage, submissionsSelector], (course, stage, files, tests, output, progress, mountedStage, submissions) => {
        const currentStageIndex = course.stages.findIndex(stageId => stageId === stage._id)
        const passed = submissions.findIndex(sub => sub.testResult && sub.testResult.pass === true) != -1;
        const courseLength = course.stages.length;
        const canAccessNextExercise = (progress.stagesCompleted >= currentStageIndex + 1) && (course.stages.length > currentStageIndex + 1) || passed;
        return { course, stage, files, tests, output, currentStageIndex, courseLength, canAccessNextExercise, mountedStage, submissions }

    })(state)
}

const mapDispatchToProps = dispatch => bindActionCreators({ mountStage, executeStage, updateFile, submitProject, fetchStageSubmissions, stageComplete }, dispatch);

class InCourseContainer extends Component {

    componentDidMount() {
        // const { stageId, courseId } = this.props.match.params;
        const { stage, course } = this.props;
        this.props.mountStage({ stage, course });
    }

    componentDidUpdate(prevProps) {
        const { stageId, courseId } = this.props.match.params;
        if (prevProps.match.params.stageId !== stageId) {
            const { stage, course } = this.props;
            this.props.mountStage({ stage, course });
        }
    }

    next() {
        const { currentStageIndex, history, course } = this.props;

        const nextStage = course.stages[currentStageIndex + 1]

        if (nextStage) {
            history.push(`/incourse/${course._id}/${nextStage}`)
        } else {
            this.props.stageComplete();
            history.push(`/path`)
        }
    }

    prev() {
        const { currentStageIndex, history, course } = this.props;
        const prevStage = course.stages[currentStageIndex - 1]
        if (prevStage) {
            history.push(`/incourse/${course._id}/${prevStage}`)
        }
    }


    render() {
        const { tests, output, stage, course, mountedStage, submissions } = this.props;
        const Stage = getStageComponent(stage.stageType);

        return (<React.Fragment >
            {mountedStage ?
                <React.Fragment>
                    <InCourseNav {...this.props} />
                    <Stage  {...this.props} />
                    <BottomNavBar {...this.props} onPrev={() => this.prev()} onNext={() => this.next()} />
                </React.Fragment>
                :
                "Loading"
            }

        </React.Fragment>)
    }
}

const getStageComponent = (type) => {
    let component = null;
    if (type === 0 || type === 6) {
        component = HtmlStage;
    } else if (type === 1) {
        component = JavaScriptStage;
    } else if (type === 10) {
        component = ProjectStage
    }

    return component;

}


const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(InCourseContainer)
connectedComponent.displayName = "InCourseContainer";

export default connectedComponent;

