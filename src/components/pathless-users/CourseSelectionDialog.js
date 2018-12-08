import { Dialog, DialogTitle, Divider, IconButton, Slide, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { differenceBy } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import CourseInfo from '../CourseInfo';
import { Container, Item } from '../utils';


const dialogStyles = {
    avatar: {

    },
};


class SimpleDialog extends React.PureComponent {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    getAvailableCourses = () => {
        return differenceBy(this.props.courses, this.props.currentPath, '_id')

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
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.object,
};

const SimpleDialogWrapped = withStyles(dialogStyles)(SimpleDialog);

export default SimpleDialogWrapped;

