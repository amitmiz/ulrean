import { Button, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from "react";
import { Link } from 'react-router-dom';
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
                <div className={classes.header} >
                    <Typography variant="h5" >
                        Choose A student to create a course path
                    </Typography>
                </div>
                {
                    users.length === 0 ? "No" :
                        <Card>
                            <CardHeader title="pathless students" />
                            <Divider />
                            <CardContent>

                                <List>

                                    {users.map(user => (
                                        <ListItem key={user._id}>
                                            <UserAvatar user={user} />
                                            <ListItemText>
                                                {`${user.name} ${user.lastname}`}
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <Button to={`/path-creation/${user._id}`} component={Link} variant="outlined" color="primary">create</Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
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

