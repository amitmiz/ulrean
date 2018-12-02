import { AppBar, Button, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

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
    }
}


class BottomNavBar extends React.Component {

    render() {
        const { classes,currentStageIndex,courseLength } = this.props;


        return (
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Button disabled={this.props.prevStage === null} onClick={this.props.onPrev} variant="outlined">prev</Button>
                    <div className={classes.stageNumber}>{`${currentStageIndex + 1}/${courseLength}`}</div>
                    <Button disabled={this.props.nextStage === null} onClick={this.props.onNext} variant="outlined">next</Button>
                </Toolbar>
            </AppBar>
        )

    }
}

const styled = withStyles(styles)(BottomNavBar);
styled.displayName = "BottomNavBar";

styled.propTypes = {
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
}

export { styled as BottomNavBar };
