import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { stageIsLoadingSelector, stageSelector } from '../../redux';
import { fetchStage } from '../../redux/actions';
import { challengeFilesSelector, challengeTestsSelector, consoleOutputSelector, executeChallenge, updateFile } from '../../state/stage-proccessor/redux';
import { BottomNavBar } from './in-course-bottom-navbar.component';
import CourseNavBar from './incourse-navbar.component.';
import { RegualrStage } from './regualr-stage.component';



const mapStateToProps = createSelector(
    challengeFilesSelector,
    challengeTestsSelector,
    consoleOutputSelector,
    stageSelector,
    stageIsLoadingSelector,
    (files, tests, output, stage, fetchStatus) => ({ files, tests, output, stage, fetchStatus })
);

const mapDispatchToProps = dispatch => bindActionCreators({ fetchStage, executeChallenge, updateFile }, dispatch);


class InCourseContainer extends Component {

    componentDidMount() {
        this.props.fetchStage(12312312333123);
    }


    render() {

        const { fetchStatus } = this.props;

        return (<React.Fragment >
            {fetchStatus.isLoading ? "loading" :
                <React.Fragment>
                    <CourseNavBar />
                    <RegualrStage {...this.props} />
                    <BottomNavBar />

                </React.Fragment>

            }
        </React.Fragment>)


    }


}


const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(InCourseContainer)
connectedComponent.displayName = "InCourseContainer";

export { connectedComponent as InCourseContainer };

