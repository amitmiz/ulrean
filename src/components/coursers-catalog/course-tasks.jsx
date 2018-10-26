import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { PlayCircleOutline } from "@material-ui/icons";
import React, { Component } from 'react';


export class CourseTasks extends Component {


    render() {

        const { course } = this.props

        return (
            <div>
                <List >
                    {
                        course.tasks.map(this.createTaskView)
                    }
                </List>
            </div>
        );
    }


    createTaskView(task, index) {

        return (<ListItem key={index}>
            <ListItemAvatar>
                <Avatar>
                    {++index}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary="Single-line item"
                secondary={'Secondary text'}
            />
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                    <PlayCircleOutline></PlayCircleOutline>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        )
    }
}


