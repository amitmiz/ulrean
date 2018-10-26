import { Chip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
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
    const { classes, theme } = props;

    return (
        <Card className={classes.card}  >
            <CardMedia className={classes.cover} image="/test.svg" title="Live from space album cover" />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {props.header}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.subheader}
                    </Typography>
                </CardContent>
                <div className={classes.tags}>
                    {props.tags.map((tag, index) => <Chip className={classes.chip} label={tag} key={index} />
                    )}
                </div>
            </div>
        </Card>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    subheader: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(String).isRequired
};

const CourseCard = withStyles(styles, { withTheme: true })(MediaControlCard);

export { CourseCard };
 