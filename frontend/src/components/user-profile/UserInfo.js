import { Button, Card, CardActions, CardContent, CardHeader, withStyles, Divider, MenuItem } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { Component } from 'react';
import UserAvatar from '../UserAvatar';
import { TextField } from 'formik-material-ui';
import PageTitle from '../PageTitle';

const styles = {
    root: {
        flex: 1
    },

    container: {
        display: 'flex',
        flexDirection: 'column'
    }

}


class UserInfo extends Component {



    render() {

        const { classes, user, onSave } = this.props;
        return (
            <div className={classes.root}>
                <PageTitle>User Info</PageTitle>

                <Formik
                    initialValues={{ ...user, path: undefined }}
                    onSubmit={(values, { setSubmitting }) => {
                        onSave({ userId: user._id, update: values });
                        setTimeout(() => setSubmitting(false), 400);
                    }}

                >
                    {({ values, isSubmitting }) => (
                        <Form>


                            <Card className={classes.card}>
                                <CardHeader avatar={<UserAvatar user={user} />} title="edit info" titleTypographyProps={{ variant: "h5" }} />
                                <Divider />
                                <CardContent>
                                    <div className={classes.container} >
                                        <Field
                                            component={TextField}
                                            name="name"
                                            label="Name"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <Field
                                            component={TextField}
                                            name="lastname"
                                            label="Last name"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <Field
                                            component={TextField}
                                            name="type"
                                            label="Type"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            select
                                        >
                                            <MenuItem value={"student"}>
                                                Student
                                            </MenuItem>
                                            <MenuItem value={"teacher"}>
                                                Teacher
                                            </MenuItem>
                                        </Field>
                                        <Field
                                            component={TextField}
                                            name="phone"
                                            label="Phone"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        {values.type === "student" &&
                                            <React.Fragment>
                                                <Field
                                                    component={TextField}
                                                    name="headingTo"
                                                    label="Heading To"
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                                <Field
                                                    component={TextField}
                                                    name="priorKnowledge"
                                                    label="Prior Knowledge"
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="outlined"
                                                />

                                            </React.Fragment>
                                        }

                                    </div>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button type="submit" color="primary" size="small">Save</Button>
                                </CardActions>
                            </Card>

                        </Form>


                    )}


                </Formik>


            </div>
        );
    }
}


export default withStyles(styles)(UserInfo);




