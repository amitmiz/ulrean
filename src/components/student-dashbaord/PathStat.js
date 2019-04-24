import { Button, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pathStatsSelector } from '../../state/selectors';
import UserAvatar from '../UserAvatar';
import { Container, Item } from '../utils';
import { Grid } from '@material-ui/core';




const style = theme => ({
    root: {
        padding: theme.spacing.unit
    }
});



const mapStateToProps = pathStatsSelector


@connect(mapStateToProps)
class PathStat extends React.PureComponent {


    notFinished() {
        const { classes, currentUser, lastCourse, lastStage, progress } = this.props

        const courseProgress = progress[lastCourse._id]

        return (<div className={classes.root} >
            <Grid container justify={"center"} direction={"row"} alignItems={"center"} wrap={"wrap"} spacing={24}>
                <Grid xs={2} item ><UserAvatar user={currentUser} /></Grid>

                <Grid item md={4} sm={10}>
                    <Typography variant="h4"><div>{currentUser.name}</div></Typography>
                    <Typography variant="h5"><div>{currentUser.lastname}</div></Typography>
                </Grid>


                <Grid item md={4} sm={12}>

                    <div><Typography variant="h4"> {lastCourse.header}</Typography></div>
                    <div><Typography variant="subtitle2"> <strong>Recomended Time To Finish: </strong>  {lastCourse.recomendedTimeToFinish && lastCourse.recomendedTimeToFinish}  </Typography></div>
                    <div><Typography variant="subtitle2"> <strong>Started :</strong> {courseProgress && courseProgress.started ? new Date(courseProgress.started).toLocaleDateString() : "Not yet"}  </Typography></div>
                    <div><Typography variant="subtitle2"> <strong>Due Date: </strong>  {courseProgress && courseProgress.dueDate ? new Date(courseProgress.dueDate).toLocaleDateString() : "Not yet"} </Typography></div>


                </Grid>
                <Grid item md={2} sm={12}>
                    <Button color="primary" variant="raised" component={Link} to={`/incourse/${lastCourse._id}/${lastStage._id}`}>Resume</Button>
                </Grid>
            </Grid>
        </div >)
    }

    finshed() {
        const { classes, currentUser, lastCourse, lastStage } = this.props

        return (<div className={classes.root} >
            <h1>Yay you finished your path!</h1>
        </div >)
    }

    render() {
        const { classes, currentUser, lastCourse, lastStage } = this.props

        return ((lastCourse && lastStage) ? this.notFinished() : this.finshed())
    }
}



export default withStyles(style)(PathStat);
