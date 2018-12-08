import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    root: {
        display: 'flex',
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


function MediaControlCard(props) {
    const { classes, course } = props;

    const courseTags = <div className={classes.tags}>
        {course.tags.map((tag, index) => <Chip className={classes.chip} label={tag} key={index} />
        )}
    </div>

    return (
        <div className={classes.root}  >
            <img src="/test.svg" />
            <div className={classes.details}>

                <div className={classes.content}>
                    <Typography component="h6" variant="h6"> {course.header} </Typography>
                    <Typography variant="subtitle1" color="textSecondary"> {course.subheader}</Typography>
                </div>

                {courseTags}
            </div>
        </div>
    );
}



MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(String).isRequired
};

const CourseInfo = withStyles(styles, { withTheme: true })(MediaControlCard);

export default CourseInfo