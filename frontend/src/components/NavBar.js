import { IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { setSideBarOpen } from '../state/ui/actions';
import { sideBarOpenSelector } from '../state/ui/reducer';
import { loggedInUserSelector } from '../state/users/reducer';
import { logout} from '../state/users/actions'
import { Logo } from './Logo';
import UserAvatar from './UserAvatar';



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

const mapDistpachToProps = (dispatch) => bindActionCreators({ setSideBarOpen,logout }, dispatch)



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
        const { classes, currentUser, isSideBarOpen, setSideBarOpen,logout } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <div className={classes.grow}>
                            <IconButton onClick={() => setSideBarOpen(!isSideBarOpen)} className={classnames(classes.menuIcon, isSideBarOpen && classes.menuIconRotated)}>
                                <MenuIcon  />
                            </IconButton>
                            <Logo />
                            {/* <Link to="/"><img alt="ulrean" className={classes.logo} src="/logo.png"></img></Link> */}
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
                    <MenuItem component={Link} to="/user" onClick={this.handleMenuClose}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
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