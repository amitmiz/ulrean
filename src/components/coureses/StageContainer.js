import React from 'react';
import { connect } from 'react-redux';
import { makeStageSelector } from '../../state/stages/reducer';
import Stage from './Stage';



const mapStateToProps = (state,ownProps) => ({
    stage: makeStageSelector(ownProps.match.params.id)(state)
})

@connect(mapStateToProps)
class StageContainer extends React.Component {

    render() {
        return (<Stage stage={this.props.stage} />)
    }

}

export default StageContainer;