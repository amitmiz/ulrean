import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNewStage, fetchStages, stagesSelector } from '../../state/stages/reducer';
import StageCreation from './StageCreation';


const mapStateToProps = state => ({
    stages: stagesSelector(state)
})


const mapDispatchToProps = dispatch => bindActionCreators({ fetchStages, addNewStage }, dispatch);

class StageCreationContainer extends React.Component {

    componentDidMount() {
        this.props.fetchStages();
    }

    render() {
        return (<StageCreation {...this.props} />)
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(StageCreationContainer);

export default connected;

