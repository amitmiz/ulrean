import { Chip, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import UserAvatar from '../UserAvatar';
import { Container, Item } from '../utils';
import QuestionTags from './QuestionTags';


const style = theme => ({
    root: {
        padding: theme.spacing.unit,
        flex: 1
    }
});

function QuestionCard(props) {
    const { classes, question } = props;

    const user = question.author;



    return (
        <div className={classes.root}>
            <Container container direction={"row"} alignItems={"center"} wrap={"nowrap"} spacing={24}>
                <Item ><UserAvatar user={user} /></Item>

                <Item md={10}>
                    <Typography variant="h5"><div>{question.header}</div></Typography>
                </Item>

                <Item>
                <QuestionTags tags={question.tags} />
                </Item>
            </Container>
        </div >
    );
}

QuestionCard.propTypes = {
    question: PropTypes.object.isRequired
}


export default withStyles(style)(QuestionCard);
