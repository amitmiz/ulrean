import React from 'react'
import { Chip, withStyles } from '@material-ui/core';

const styles = {
    chip: {
        marginRight: '10px'
    },
    tags: {
        display: 'flex',
    }
}

const QuestionTags = ({ classes, tags }) => (
    <div className={classes.tags}>
        {tags.map((tag, index) => <Chip className={classes.chip} label={tag} key={index} />)}
    </div>
)

export default withStyles(styles)(QuestionTags);