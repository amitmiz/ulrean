import { Drawer } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ContactsIcon from "@material-ui/icons/Contacts";
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import LibraryBooks from '@material-ui/icons/LibraryBooksRounded';
import NewReleaseIcon from '@material-ui/icons/NewReleases';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

const drawerWidth = 200


const styles = theme => ({

    hide: {
        display: 'none',
    },
    drawerPaper: {
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },

    toggleButton: {
        bottom: "0px",
        position: "absolute"
    },
    toolbarSpacer: theme.mixins.toolbar





});


class SideMenuComponent extends Component {

    constructor(props) {
        super(props)

        this.state = { open: false }

        this.handleDrawerClose = this.handleDrawerClose.bind(this)
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    }


    handleDrawerOpen() {
        this.setState({ open: true });
    }



    handleDrawerClose() {
        this.setState({ open: false });
    }

    toggleButton() {
        const { classes } = this.props;


        return (<List className={classes.toggleButton}>
            {this.state.open ?
                <ListItem button onClick={this.handleDrawerClose}>
                    <ListItemIcon>
                        <ChevronLeftIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Close"} />
                </ListItem>
                :
                <ListItem button onClick={this.handleDrawerOpen}>
                    <ListItemIcon>
                        <ChevronRightIcon />
                    </ListItemIcon>
                </ListItem >
            }
        </List>
        )
    }


    render() {
        const { classes } = this.props;
        return (


            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                }}
                open={this.state.open}
            >

                <div className={classes.toolbarSpacer}></div>


                <Divider />
                <List>




                    <ListItem button component={NavLink} to="/path" >
                        <ListItemIcon>
                            <LibraryBooks />
                        </ListItemIcon>
                        <ListItemText primary="Course Path" />
                    </ListItem>

                    <ListItem button component={NavLink} to="/tdashboard" >
                        <ListItemIcon>
                            <DashboardRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashbaord" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/pathless" >
                        <ListItemIcon>
                            <NewReleaseIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pathless" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/qa" >
                        <ListItemIcon>
                            <QuestionAnswerIcon />
                        </ListItemIcon>
                        <ListItemText primary="QA" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/teacher-contact" >
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Teachers" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/incourse" >
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="InCourse" />
                    </ListItem>


                </List>

                <Divider />


                {this.toggleButton()}

            </Drawer>

        );
    }
}

SideMenuComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};



const SideMenu = withStyles(styles, { withTheme: true })(SideMenuComponent);
SideMenu.displayName = "StyledSideMenu";
export { SideMenu }
