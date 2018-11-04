import React from "react";
import { withStyles, Card, CardHeader, Typography, CardContent, List, ListItemText, ListItemSecondaryAction, Button, ListItemAvatar, ListItem, Avatar, Divider } from "@material-ui/core";
import { UserAvatar } from "./avater.component";
import { currentUser, users } from "../static-data";

const styles = {
    root: {
        flex: 1
    }
};


class PathLessStudents extends React.Component {

    getPathlessStudents() {
        return users.filter(user => !user.path)
    }


    render() {
        const { classes } = this.props;


        return (

            <div className={classes.root} >

                <Typography variant="h5" >

                    Choose A student to create a course path


                </Typography>
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
                                        <Button variant="raised" color="primary">create</Button>

                                    </ListItemSecondaryAction>

                                </ListItem>


                            ))}


                        </List>


                    </CardContent>


                </Card>


            </div>



        )
    }

}

const WrappedComponent = withStyles(styles)(PathLessStudents)

export { WrappedComponent as PathLessStudents }