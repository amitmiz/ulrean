import { Button, Card, CardActions, CardContent, CardHeader, TextField, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedInUserSelector } from '../state/users/user.reducer';
import UserAvatar  from './UserAvatar';


const styles = {
    root: {
        flex: 1
    },

    container: {
        display: 'flex',
        flexDirection: 'column'
    }

}

const mapStateToProps = state => {
    return { currentUser: loggedInUserSelector(state) };
};



class UserInfo extends Component {

    componentDidMount() {
        this.setState({ ...this.props.currentUser });
    }


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    }

    render() {

        const { classes, currentUser } = this.props;
        return (
            <div className={classes.root}>

                <Card className={classes.card}>
                    <CardHeader avatar={<UserAvatar user={currentUser} />} title="User Info" titleTypographyProps={{ variant: "h5" }} />



                    <CardContent>
                        <form className={classes.container} noValidate autoComplete="off">

                            <TextField
                                id="name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="lastname"
                                label="Last Name"
                                value={this.state.lastname}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                required
                                id="type"
                                label="Type"
                                value={this.state.type}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </form>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" size="small">Learn More</Button>
                        <Button color="secondary" size="small">Learn More</Button>
                    </CardActions>
                </Card>


            </div>
        );
    }
}


const styled = withStyles(styles)(UserInfo);

const connected = connect(mapStateToProps)(styled);

export default connected;
