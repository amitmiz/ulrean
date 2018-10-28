import { Paper, TextField, Grid, withStyles, Button, Typography, Avatar } from '@material-ui/core';
import React, { Component } from 'react';
import LockIcon from '@material-ui/icons/Lock'

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
        width: "40%",
        height: "300px",
        marginTop: "40px",
        padding: '20px'
    },
    loginButton: {
        marginTop: '10px'
    }
}

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
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

                        <form>


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

                            <Button className={classes.loginButton} color="primary" variant="raised" fullWidth>
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
