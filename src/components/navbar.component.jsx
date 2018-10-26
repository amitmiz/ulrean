import { Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { currentUser } from '../static-data';
import { UserAvatar } from './avatar/avater.component';


const drawerWidth = 200


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo : {
        width : '50px',
        padding : '8px'
    }
});


class NavBar extends Component {

    constructor(props) {
        super(props)

        this.state = { menuAnchor: null }

        this.handleMenuClose = this.handleMenuClose.bind(this)
        this.handleMenuOpen = this.handleMenuOpen.bind(this)


    }


    handleMenuOpen(event) {
        this.setState({ menuAnchor: event.currentTarget });
    }



    handleMenuClose() {
        this.setState({ menuAnchor: null });
    }




    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        {/* <Typography variant="h5" color="inherit" >
                            ULEARN
                     </Typography> */}
                        <div className={classes.grow}>
                            <img className={classes.logo} src="/logo.png"></img>
                        </div>

                        <Typography variant="button" color="inherit" >{currentUser.type}</Typography>

                        <UserAvatar ref={this.userAvaterRef} onClick={this.handleMenuOpen} user={currentUser} />


                        {/* <Button variant="outlined" color="inherit">Login</Button> */}


                    </Toolbar>
                </AppBar>

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.menuAnchor}
                    open={!!this.state.menuAnchor}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavBar);