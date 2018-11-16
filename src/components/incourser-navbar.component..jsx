import { Badge, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { UserAvatar } from './avater.component';




const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    courseName: {
        flexGrow: 1,
        textAlign: 'center'
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        width: '50px',
        padding: '8px'
    }
});


@inject('userStore')
@observer
class CourseNavBar extends Component {

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
        const { classes, userStore } = this.props;
        const { currentUser } = userStore;
        return (
            <div className={classes.root}>
                <AppBar elevation={0} className={classes.appBar} position="fixed">
                    <Toolbar>

                        <div >
                            <Link to="/"><img alt="ulrean" className={classes.logo} src="/logo.png"></img></Link>
                        </div>
                        <div className={classes.courseName}>CSS Course</div>

                        <Typography variant="button" color="inherit" >{currentUser.type}</Typography>



                        <UserAvatar ref={this.userAvaterRef} onClick={this.handleMenuOpen} user={currentUser} />





                    </Toolbar>
                </AppBar>

                <Menu
                    id="simple-menu"
                    anchorEl={this.state.menuAnchor}
                    open={!!this.state.menuAnchor}
                    onClose={this.handleMenuClose}
                >
                    <MenuItem component={Link} to="/user" onClick={this.handleMenuClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

CourseNavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CourseNavBar);