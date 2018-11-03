import { Paper, TextField, Grid, withStyles, Button, Typography, Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import LockIcon from '@material-ui/icons/Lock'
import {inject, observer} from 'mobx-react'

const style = {
    root: {
        flex: 1,
        display: "flex",
        position: "absolute",
        height: "100%",
        width: "100%",
        justifyContent: "center"

    },
    loginForm: {
        width: "20%",
        height: "300px",
        marginTop: "40px",
        padding: '20px'
    },
    loginButton: {
        marginTop: '10px'
    }
}

@inject('authStore')
@observer
class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    handleOnSubmit() {
        this.props.authStore.login()
    }


    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.loginForm}>



                    <Grid container direction="column"
                        alignItems="center">



                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>

                        <Typography variant="h5">Login</Typography>

                        <form onSubmit={this.handleOnSubmit}>


                            <TextField fullWidth={true}
                                id="user"
                                label="User Name"
                                // className={classes.textField}
                                value={this.state.user}
                                onChange={this.handleChange('user')}
                                margin="normal"

                            />

                            <TextField fullWidth
                                id="password"
                                label="Password"
                                // className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                margin="normal"

                            />

                            <Button type="submit" className={classes.loginButton} color="primary" variant="raised" fullWidth>
                                Login
                            </Button>
                        </form>
                    </Grid>

                </Paper>
            </div>
        );
    }
}

const withStyle = withStyles(style)(LoginScreen);

export { withStyle as LoginScreen };
