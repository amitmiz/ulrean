import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Info from '@material-ui/icons/Info';
export function StageListItem({ stage, index }) {
    return (<ListItem>
        <ListItemAvatar>
            <Avatar>
                {++index}
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={stage.title} />
        <ListItemSecondaryAction>
            <IconButton component={Link} to={`/stages/${stage._id}`}>
                <Info />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>);
}
