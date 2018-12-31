import { AppBar, Button, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const styles = {
    appBar: {
        top: 'auto',
        bottom: 0,
        zIndex: 2000
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    stageNumber: {
        margin: '20px'
    }, expandedRoot: {
        flexDirection: "column"
    },
    nextButton: {
        padding: '0 30px',
        transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    nextButtonEnabled: {
        color: 'black',
        height: '48px',
        padding: '0 30px',
        background: 'linear-gradient(45deg, #04ff00 30%, #a8e4a4 90%)',
    }

}




class BottomNavBar extends React.Component {

    render() {
        const { classes, currentStageIndex, courseLength } = this.props;


        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Button disabled={this.props.currentStageIndex === 0} onClick={this.props.onPrev} variant="outlined">prev</Button>
                    <div className={classes.stageNumber}>{`${currentStageIndex + 1}/${courseLength}`}</div>
                    <Button className={classnames(classes.nextButton, { [classes.nextButtonEnabled]: this.props.canAccessNextExercise })} disabled={!this.props.canAccessNextExercise} onClick={this.props.onNext} variant="outlined">next</Button>
                </Toolbar>
            </AppBar >
        )

    }
}



const styled = withStyles(styles)(BottomNavBar);
styled.displayName = "BottomNavBar";

styled.propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
}

export default styled;
