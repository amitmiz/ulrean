import { Dialog, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, withStyles, Divider, Slide } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';
import { ApiClient } from '../api-client';
import { CourseInfo } from './course-info';
import { Item } from './utils';
import { Container } from './utils';


const dialogStyles = {
    avatar: {

    },
};


class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    getAvailableCourses = () => {
        return ApiClient.getAllCourses().filter((course) => {
            const isFound = this.props.currentPath.find((usedCourse) => usedCourse._id === course._id)
            return isFound == undefined;
        })
    }

    coursesList = (courses) => {
        return courses.map(course => (
            <div key={course._id}>

                <Container alignItems="center" direction="row">
                    <Item xs={11}><CourseInfo course={course}></CourseInfo></Item>
                    <Item><IconButton onClick={() => this.handleListItemClick(course)}> <AddIcon /></IconButton>
                    </Item>

                </Container>




                <Divider />

            </div>))
    }

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        const availableCourses = this.getAvailableCourses()

        const isCoursesLeft = availableCourses.length > 0

        const mappedCourse = this.coursesList(availableCourses);

        return (
            <Dialog fullScreen TransitionComponent={Slide} onClose={this.handleClose} {...other}>
                <DialogTitle id="simple-dialog-title">Pick Course</DialogTitle>
                <div>

                    {isCoursesLeft ? mappedCourse : "No coures left for selection"}


                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.object,
};

const SimpleDialogWrapped = withStyles(dialogStyles)(SimpleDialog);

export { SimpleDialogWrapped as CourseSelectionDialog };

