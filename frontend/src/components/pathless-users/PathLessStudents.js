import { Button, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles, Card } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from "react";
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';
import UserAvatar from "../UserAvatar";


const styles = {
    root: {
        flex: 1
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center'
    }
};


class PathLessStudents extends React.Component {

    render() {
        const { classes, users } = this.props;


        return (
            <div className={classes.root} >
                <PageTitle >Pathless Students</PageTitle>

                {
                    users.length === 0 ? "No" :

                        <Card>

                            <List>

                                {users.map(user => (
                                    <ListItem key={user._id}>
                                        <UserAvatar user={user} />
                                        <ListItemText>
                                            {user.name}  <strong>{user.lastname}</strong>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            {console.log(`/path-creation/${user._id}`)}
                                            <Button to={`/path-creation/${user._id}`} component={Link} variant="outlined" color="primary">create</Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                }
            </div>)
    }

}

const styled = withStyles(styles)(PathLessStudents)
styled.displayName = "PathlessUsers"
styled.propTypes = {
    users: PropTypes.arrayOf(PropTypes.obj).isRequired
}

export default styled;

