import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import UserAvatar  from '../UserAvatar';
import { Container } from '../utils';
import { Item } from '../utils';



const style = theme => ({
    root: {
        padding: theme.spacing.unit
    }
});

function PathStat(props) {
    const { classes, currentUser, lastCourse } = props;

    return (
        <div className={classes.root}>
            <Container style={{ height: "200px" }} container direction={"row"} alignItems={"center"} wrap={"nowrap"} spacing={24}>
                <Item ><UserAvatar user={currentUser} /></Item>

                <Item md={10}>
                    <Typography variant="h4"><div>{currentUser.name}</div></Typography>
                    <Typography variant="h5"><div>{currentUser.lastname}</div></Typography>
                </Item>

                <Item>
                    <div>
                        <div><Typography variant="h6"><strong>Current Course:</strong>{lastCourse.header}</Typography></div>
                        <div><Typography variant="h6"><strong>Points:</strong>123</Typography></div>
                    </div>
                </Item>
            </Container>
        </div >
    );
}


const PathStatWithStyle = withStyles(style)(PathStat)

export default PathStatWithStyle;
