import React from 'react'
import PageTitle from '../PageTitle';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, withStyles } from '@material-ui/core';
import UserAvatar from '../UserAvatar';
import { Link } from 'react-router-dom'


const styles = {
    root: {
        flex: 1
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center'
    }
};

class SubmittedProjects extends React.Component {



    render() {

        const { classes, submissions } = this.props;

        return (<div className={classes.root} >
            <PageTitle >Pathless Students</PageTitle>

            {
                submissions.length === 0 ? "No" :

                    <List>

                        {submissions.map(submission => (
                            <ListItem key={submission._id}>
                                <UserAvatar user={submission.user} />
                                <ListItemText>
                                    {submission.user.name}  <strong>{submission.user.lastname}</strong>
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <Button to={`/check-submission/${submission._id}`} component={Link} variant="outlined" color="primary">check</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
            }
        </div>)
    }

}

export default withStyles(styles)(SubmittedProjects)