import { Button, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { pathStatsSelector } from '../state/selectors';
import UserAvatar from './UserAvatar';
import { Container, Item } from './utils';




const style = theme => ({
    root: {
        padding: theme.spacing.unit
    }
});



const mapStateToProps = pathStatsSelector


@connect(mapStateToProps)
class PathStat extends React.PureComponent {


    notFinished() {
        const { classes, currentUser, lastCourse, lastStage } = this.props

        return (<div className={classes.root} >
            <Container style={{ height: "200px" }} container direction={"row"} alignItems={"center"} wrap={"nowrap"} spacing={24}>
                <Item ><UserAvatar user={currentUser} /></Item>

                <Item md={7}>
                    <Typography variant="h4"><div>{currentUser.name}</div></Typography>
                    <Typography variant="h5"><div>{currentUser.lastname}</div></Typography>
                </Item>

                <Item>
                    <div>
                        <div><Typography variant="subtitle1"><strong>Current Course:</strong>{lastCourse.header}</Typography></div>
                        <Button color="primary" variant="raised" component={Link} to={`/incourse/${lastCourse._id}/${lastStage._id}`}>Resume</Button>
                    </div>
                </Item>
            </Container>
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
