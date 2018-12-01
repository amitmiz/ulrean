import { AppBar, Button, Toolbar, withStyles } from '@material-ui/core';
import React from 'react';

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


const BottomNavBar = ({ classes }) => {

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Button variant="outlined">prev</Button>
                <div className={classes.stageNumber}>7/16</div>
                <Button variant="outlined">next</Button>
            </Toolbar>
        </AppBar>
    )


}

const styled = withStyles(styles)(BottomNavBar);
styled.displayName = "BottomNavBar";

export { styled as BottomNavBar };
