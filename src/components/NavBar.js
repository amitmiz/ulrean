import { Badge, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import UserAvatar from './UserAvatar';
import { connect } from 'react-redux';
import { loggedInUserSelector } from '../state/users/reducer';
import { bindActionCreators } from 'redux';
import { sideBarOpenSelector } from '../state/ui/reducer';
import { setSideBarOpen } from '../state/ui/actions'
import MenuIcon from '@material-ui/icons/Menu'
import classnames from 'classnames';



const styles = theme => ({
    root: {
    },
    grow: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    logo: {
        width: '50px',
        padding: '8px'
    },
    menuIcon: {
        color: "white",
        transition: theme.transitions.create('transform', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('lg')]: { display: 'none', },
    }, menuIconRotated: {
        transform: 'rotate(90deg)',
    }
});

const mapStateToProps = state => ({
    currentUser: loggedInUserSelector(state),
    isSideBarOpen: sideBarOpenSelector(state)
})

const mapDistpachToProps = (dispatch) => bindActionCreators({ setSideBarOpen }, dispatch)



@connect(mapStateToProps, mapDistpachToProps)
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
        const { classes, currentUser, isSideBarOpen, setSideBarOpen } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        {/* <Typography variant="h5" color="inherit" >
                            ULEARN
                     </Typography> */}
                        <div className={classes.grow}>

                            <IconButton className={classnames(classes.menuIcon, isSideBarOpen && classes.menuIconRotated)}>
                                <MenuIcon onClick={() => setSideBarOpen(!isSideBarOpen)} />
                            </IconButton>


                            <Typography variant="h5" color="inherit" style={{
                                fontStyle: 'italic',
                                fontWeight: '100',
                            }} >
                                ULEARN
                     </Typography>
                            {/* <Link to="/"><img alt="ulrean" className={classes.logo} src="/logo.png"></img></Link> */}
                        </div>

                        <Typography variant="button" color="inherit" >{currentUser.type}</Typography>

                        <IconButton color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

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
                    <MenuItem component={Link} to="/user" onClick={this.handleMenuClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
                </Menu>
            </div >
        );
    }
}



const styled = withStyles(styles, { withTheme: true })(NavBar);


styled.propTypes = {
    classes: PropTypes.object
};

styled.displayName = "NavBar"
export default styled