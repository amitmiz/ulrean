import React from "react";
import { withStyles, Card, CardHeader, Typography, CardContent, List, ListItemText, ListItemSecondaryAction, Button, ListItemAvatar, ListItem, Avatar, Divider } from "@material-ui/core";
import { UserAvatar } from "./avater.component";
import { Link } from 'react-router-dom'
import { ApiClient } from "../api-client";

const styles = {
    root: {
        flex: 1
    }
};


class PathLessStudents extends React.Component {

    getPathlessStudents() {
        const a = ApiClient.getAllUsers();
        debugger;
        return ApiClient.getAllUsers().filter(user => !user.path)
    }


    render() {
        const { classes } = this.props;


        return (

            <div className={classes.root} >

                <Typography variant="h5" >

                    Choose A student to create a course path


                </Typography>


                {this.getPathlessStudents().length == 0 ? "No" :
                    <Card>
                        <CardHeader title="pathless students" />
                        <Divider />
                        <CardContent>

                            <List>

                                {this.getPathlessStudents().map(user => (
                                    <ListItem>
                                        <UserAvatar user={user} />

                                        <ListItemText>
                                            {user.name}
                                        </ListItemText>
                                        <ListItemSecondaryAction>


                                            <Button to={`/path-creation/${user._id}`} component={Link} variant="contained" color="primary">create</Button>

                                        </ListItemSecondaryAction>

                                    </ListItem>


                                ))}


                            </List>


                        </CardContent>


                    </Card>}




            </div>



        )
    }

}

const WrappedComponent = withStyles(styles)(PathLessStudents)

export { WrappedComponent as PathLessStudents }