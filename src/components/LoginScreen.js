import { Avatar, Button, Grid, Paper, TextField, Typography, withStyles } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authRequest } from '../state/users/actions';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom'

const style = theme => ({
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
        height: "350px",
        marginTop: "40px",
        padding: '20px',
        [theme.breakpoints.down('md')]: { width: "100%", height: "100%", marginTop: "0", }
    },
    loginButton: {
        marginTop: '10px'
    }
})

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ authRequest }, dispatch)


}

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    handleOnSubmit(event) {


        this.props.authRequest(this.state);

        event.preventDefault();



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

                        <form onSubmit={this.handleOnSubmit} >


                            <TextField fullWidth={true}
                                id="email"
                                label="Email"
                                // className={classes.textField}
                                value={this.state.user}
                                onChange={this.handleChange('email')}
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

                            <Button type="submit" className={classes.loginButton} color="primary" variant="contained" fullWidth>
                                Login
                            </Button>

                            <Button component={Link} to="/register" className={classes.loginButton} color="secondary" variant="contained" fullWidth>
                                Register
                            </Button>


                        </form>
                    </Grid>

                </Paper>
            </div>
        );
    }
}

const withStyle = connect(mapStateToProps, mapDispatchToProps)(withStyles(style, { withTheme: true })(LoginScreen));

withStyle.displayName = "LoginScreen"

export default withStyle;

