import { Typography, withStyles, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { userCoursesProgressSelector, makeCurrentStageIndexSelector } from '../state/courses-progress/reducer';
import { makeCourseSelector } from '../state/courses/reducer';
import { makePathSelector } from '../state/predefiend-path/reducer';
import { loggedInUserSelector } from '../state/users/reducer';
import UserAvatar from './UserAvatar';
import { Container, Item } from './utils';

import { Link } from 'react-router-dom'
import { pathStatsSelector } from '../state/selectors';



const style = theme => ({
    root: {
        padding: theme.spacing.unit
    }
});



const mapStateToProps = pathStatsSelector


@connect(mapStateToProps)
class PathStat extends React.PureComponent {

    render() {
        const { classes, currentUser, lastCourse, lastStage } = this.props

        return (
            <div className={classes.root} >
                <Container style={{ height: "200px" }} container direction={"row"} alignItems={"center"} wrap={"nowrap"} spacing={24}>
                    <Item ><UserAvatar user={currentUser} /></Item>

                    <Item md={7}>
                        <Typography variant="h4"><div>{currentUser.name}</div></Typography>
                        <Typography variant="h5"><div>{currentUser.lastname}</div></Typography>
                    </Item>

                    <Item>
                        <div>
                            <div><Typography variant="subtitle1"><strong>Current Course:</strong>{lastCourse.header}</Typography></div>
                            <Button color="primary" variant="raised" component={Link} to={`/incourse/${lastCourse.slug}/${lastStage.slug}`}>Resume</Button>
                        </div>
                    </Item>
                </Container>
            </div >
        )
    }
}



export default withStyles(style)(PathStat);
