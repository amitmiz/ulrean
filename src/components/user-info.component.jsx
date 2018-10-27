import React, { Component } from 'react';
import { Paper, TextField, withStyles, Card, CardContent, Typography, CardActions, Button, CardHeader } from '@material-ui/core';
import { UserAvatar } from './avatar/avater.component';
import { currentUser } from '../static-data';


const styles = {
    root: {
        flex: 1
    },

    container: {
        display:'flex',
        flexDirection : 'column'
    }

}

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...currentUser
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


const WithStyles = withStyles(styles)(UserInfo);

export { WithStyles as UserInfo };