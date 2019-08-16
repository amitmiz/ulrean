import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '5px',
        [theme.breakpoints.down('sm')]: { flexDirection: 'column', },
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '10px',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    tags: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    }, chip: {
        margin: theme.spacing.unit,
    }


});


function MediaControlCard({ classes, course, courseProgress }) {



    return (
        <div className={classes.root}  >
            <img src="/test.svg" />

            <div className={classes.details}>

                <div className={classes.content}>
                    <Typography component="h6" variant="h6"> {course.header} </Typography>
                    <Typography variant="subheading" color="textSecondary"> {course.subheader}</Typography>
                    {/* <div> <strong>Completed: </strong> {courseProgress && courseProgress.completed ? "Yes" : "Not yet"}</div> */}
                    <div> <strong>Recomended Time To Finish: </strong>  {course.recomendedTimeToFinish && course.recomendedTimeToFinish}</div>
                    <div><strong>Started :</strong> {courseProgress && courseProgress.started ? new Date(courseProgress.started).toLocaleDateString() : "Not yet"}</div>
                    <div><strong>Due Date: </strong>  {courseProgress && courseProgress.dueDate ? new Date(courseProgress.dueDate).toLocaleDateString() : "Not yet"}</div>


                    <div className={classes.tags}>
                        {course.tags.map((tag, index) => <Chip className={classes.chip} label={tag} key={index} />
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}



MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(String).isRequired,
    courseProgress: PropTypes.object
};

const CourseInfo = withStyles(styles, { withTheme: true })(MediaControlCard);

export default CourseInfo