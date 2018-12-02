import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { PlayCircleOutline } from "@material-ui/icons";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';




export class CourseTasks extends Component {


    render() {

        const { course } = this.props

        return (
            <div>
                <List >
                    {
                        course.stages.map((stage, index) => this.createTaskView(course, stage, index))
                    }
                </List>
            </div>
        );
    }


    createTaskView(course, { title, _id }, index) {

        return (<ListItem key={_id}>
            <ListItemAvatar>
                <Avatar>
                    {++index}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
            />
            <ListItemSecondaryAction>
                <IconButton component={Link} to={`/incourse/${course._id}/${_id}`} aria-label="Delete">
                    <PlayCircleOutline></PlayCircleOutline>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        )
    }
}


