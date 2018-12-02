import { Typography, withStyles, Chip } from '@material-ui/core';
import React from 'react';
import { UserAvatar } from '../avater.component';
import { Container } from '../utils';
import { Item } from '../utils';
import PropTypes from 'prop-types';
import { ApiClient } from '../../api-client';


const style = theme => ({
    root: {
        padding: theme.spacing.unit,
        flex: 1
    }, chip: {
        marginRight: '10px'
    }
});

function Question(props) {
    const { classes, question } = props;

    const user = question.author;

    const tags = <div className={classes.tags}>
        {question.tags.map((tag, index) => <Chip className={classes.chip} label={tag} key={index} />
        )}
    </div>

    return (
        <div className={classes.root}>
            <Container style={{ height: "200px" }} container direction={"row"} alignItems={"center"} wrap={"nowrap"} spacing={24}>
                <Item ><UserAvatar user={user} /></Item>

                <Item md={10}>
                    <Typography variant="h5"><div>{question.header}</div></Typography>
                </Item>

                <Item>
                    {tags}
                </Item>
            </Container>
        </div >
    );
}

Question.propTypes = {
    question: PropTypes.object.isRequired
}

const WithStyles = withStyles(style)(Question)

export { WithStyles as Question };
