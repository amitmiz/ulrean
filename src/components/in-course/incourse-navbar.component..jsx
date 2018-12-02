import { Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { UserAvatar } from '../avater.component';
import { loggedInUserSelector } from '../../state/users/user.reducer';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
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

// TODO : Not sure if course should be passed this way
const mapStateToProps = (state, ownProps) => {
    return { currentUser: loggedInUserSelector(state), course: ownProps.course };
};

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
        const { classes, currentUser, course } = this.props;
        return (
            <div className={classes.root}>
                <AppBar elevation={0} className={classes.appBar} position="fixed">
                    <Toolbar>
                        <div >
                            <Link to="/"><img alt="ulrean" className={classes.logo} src="/logo.png"></img></Link>
                        </div>
                        <div className={classes.courseName}>{course.header}</div>
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

const withSyles = withStyles(styles, { withTheme: true })(CourseNavBar);

const conncted = connect(mapStateToProps)(withSyles)

conncted.propTypes = {
    classes: PropTypes.object,
    course: PropTypes.object
};

conncted.displayName = "NavBarCourse"

export default conncted