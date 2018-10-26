import { Grid, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { currentUser } from '../../static-data';
import { UserAvatar } from '../avatar/avater.component';



const style = theme => ({
    root: {
        padding: theme.spacing.unit
    }
});

function PathStat(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid style={{ height: "200px" }} container direction={"row"} alignItems={"center"} wrap={"nowrap"} spacing={24}>
                <Grid item><UserAvatar user={currentUser} /></Grid>
                <Grid item md={12}>
                    <Typography variant="h4"><div>{currentUser.name}</div></Typography>
                    <Typography variant="h5"><div>{currentUser.lastname}</div></Typography>
                </Grid>
                <Grid item><div>stats</div></Grid>
            </Grid>
        </div >
    );
}


const PathStatWithStyle = withStyles(style)(PathStat)

export { PathStatWithStyle as PathStat };
