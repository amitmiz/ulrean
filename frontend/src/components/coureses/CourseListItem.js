import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import Info from '@material-ui/icons/Info';
import React from 'react';
import { Link } from 'react-router-dom';
export function CourseListItem({ course, index }) {
    return (<ListItem button>
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
    );
}
