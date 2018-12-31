import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import PlayIcon from "@material-ui/icons/PlayCircleOutline";
import React from 'react';
import { Link } from 'react-router-dom';




const CourseTasks = ({ course, courseProgress }) => {



    return (
        <div>
            <List >
                {
                    course.stages.map((stage, index) => <Task key={stage._id} course={course} stage={stage} index={index} disabled={courseProgress.stagesCompleted < index} />)
                }
            </List>
        </div>
    );
}

function Task({ course, stage, index ,disabled}) {

    return (
        <ListItem >
            <ListItemAvatar>
                <Avatar>
                    {++index}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={stage.title} />
            <ListItemSecondaryAction>
                <IconButton disabled={disabled} component={Link} to={`/incourse/${course._id}/${stage._id}`} >
                    <PlayIcon></PlayIcon>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default CourseTasks;
