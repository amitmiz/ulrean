import { Avatar, Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, withStyles, Divider, Grid, Typography, Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';
import Info from '@material-ui/icons/Info'


const styles = {
    root: {
        flex: 1
    }
}


class Course extends React.Component {



    render() {
        const { classes, course } = this.props;
        return (
            <div className={classes.root} >
                <PageTitle>{`Courses >  ${course.header}`}</PageTitle>

                <Grid container direction="column" spacing="16">

                    <Grid item>
                        <Typography variant={"subtitle2"}>description</Typography>
                        <p>{course.subheader}</p>

                    </Grid>

                    <Grid item>

                        <Typography variant={"subtitle2"}>stages</Typography>
                        <List>
                            {course.stages.map((stage, index) => <StageListItem stage={stage} index={index} />)}

                        </List>


                    </Grid>
                </Grid>


            </div>)

    }

}

function StageListItem({ stage, index }) {

    return (
        <ListItem >
            <ListItemAvatar>
                <Avatar>
                    {++index}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={stage.title} />
            <ListItemSecondaryAction>
                <IconButton component={Link} to={`/stages/${stage.slug}`} >
                    <Info />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default withStyles(styles)(Course)