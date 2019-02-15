import { Button, Card, CardActions, CardContent, CardHeader, Divider, MenuItem, withStyles } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { Component } from 'react';
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


class Register extends Component {



    render() {

        const { classes, user, onSave } = this.props;
        return (
            <div className={classes.root}>
                <PageTitle>Register</PageTitle>

                <Formik
                    initialValues={{ ...user, path: undefined }}
                    onSubmit={(values, { setSubmitting }) => {
                        onSave({ user: values });
                        setTimeout(() => setSubmitting(false), 400);
                    }}

                >
                    {({ values, isSubmitting }) => (
                        <Form>


                            <Card className={classes.card}>
                                <CardHeader title="Register" titleTypographyProps={{ variant: "h5" }} />
                                <Divider />
                                <CardContent>
                                    <div className={classes.container} >
                                        <Field
                                            component={TextField}
                                            name="username"
                                            label="User Name"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                        <Field
                                            component={TextField}
                                            name="email"
                                            label="Email"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />

                                        <Field
                                            component={TextField}
                                            type="password"

                                            name="password"
                                            label="Password"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
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


export default withStyles(styles)(Register);




