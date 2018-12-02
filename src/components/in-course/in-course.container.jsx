import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { makeCourseSelector } from '../../state/courses/reducer';
import { challengeFilesSelector, challengeTestsSelector, consoleOutputSelector, executeChallenge, updateFile } from '../../state/stage-proccessor/redux';
import { initStage } from '../../state/stages/actions';
import { makeStageSelector } from '../../state/stages/reducer';
import { BottomNavBar } from './in-course-bottom-navbar.component';
import CourseNavBar from './incourse-navbar.component.';
import { RegualrStage } from './regualr-stage.component';



const mapStateToProps = (state, ownProps) => {

    const courseSelector = makeCourseSelector(ownProps.match.params.courseId)
    const stageSelector = makeStageSelector(ownProps.match.params.stageId)

    return createSelector([
        courseSelector,
        stageSelector,
        challengeFilesSelector,
        challengeTestsSelector,
        consoleOutputSelector

    ], (course, stage, files, tests, output) => {

        const currentStageIndex = course.stages.findIndex(stageId => stageId === stage._id)
        const courseLength = course.stages.length;
        const nextStage = (course.stages.length > currentStageIndex + 1) ? course.stages[currentStageIndex + 1] : null
        const prevStage = (currentStageIndex - 1 >= 0) ? course.stages[currentStageIndex - 1] : null
        return {
            course, stage, files, tests, output, currentStageIndex, courseLength, nextStage, prevStage
        }

    })(state)
}



const mapDispatchToProps = dispatch => bindActionCreators({ initStage, executeChallenge, updateFile }, dispatch);





class InCourseContainer extends Component {


    constructor(props) {
        super(props)
    }


    next() {
        const { nextStage, history, course } = this.props;
        if (nextStage) {
            history.push(`/incourse/${course._id}/${nextStage}`)
        }
    }

    prev() {
        const { prevStage, history, course } = this.props;
        if (prevStage) {
            history.push(`/incourse/${course._id}/${prevStage}`)
        }
    }

    componentDidMount() {
        const stageId = this.props.match.params.stageId;

        this.props.initStage(stageId);
    }

    componentDidUpdate(prevProps) {
        const stageId = this.props.match.params.stageId;
        if (prevProps.match.params.stageId !== stageId) {
            this.props.initStage(stageId);
        }
    }


    render() {
        const { tests, stage, course } = this.props;


        return (<React.Fragment >
            {tests.length !== 0 ?
                <React.Fragment>
                    <CourseNavBar {...this.props} />
                    <RegualrStage {...this.props} stage={stage} />
                    <BottomNavBar {...this.props} onPrev={() => this.prev()} onNext={() => this.next()} />
                </React.Fragment>
                :
                "Loading"
            }

        </React.Fragment>)


    }


}


const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(InCourseContainer)
connectedComponent.displayName = "InCourseContainer";

export { connectedComponent as InCourseContainer };

