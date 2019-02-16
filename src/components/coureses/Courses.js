import React from 'react';
import { withStyles, ListItemAvatar, ListItem, Avatar, ListItemText, ListItemSecondaryAction, IconButton, List, Paper, Card } from '@material-ui/core';
import PageTitle from '../PageTitle';
import CourseInfo from '../CourseInfo';
import Info from '@material-ui/icons/Info'
import { Link } from 'react-router-dom'

const styles = {
    root: {
        "flex": '1',
    },
}


class Courses extends React.Component {



    render() {
        const { classes, courses } = this.props;
        return (
            <div className={classes.root} >
                <PageTitle> Courses </PageTitle>

                <Card>



                    <List>
                        {courses.map((course, index) =>
                            <CourseListItem key={course._id} course={course} index={index} />
                        )}


                    </List>

                </Card>



            </div>)

    }

}

function CourseListItem({ course, index }) {
    return (

        <ListItem button >
            <ListItemAvatar>
                <Avatar>
                    {++index}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={course.header} />
            <ListItemSecondaryAction>
                <IconButton component={Link} to={`/courses/${course._id}`}>
                    <Info />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>

        // <Link <CourseInfo key={course._id} course={course} />  </Link>
    )
}

export default withStyles(styles)(Courses)