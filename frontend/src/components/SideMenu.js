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
import PeopleIcon from "@material-ui/icons/People";

import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import LibraryBooks from '@material-ui/icons/LibraryBooksRounded';
import NewReleaseIcon from '@material-ui/icons/NewReleases';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { sideBarOpenSelector } from '../state/ui/reducer';
import { setSideBarOpen } from '../state/ui/actions'
import { bindActionCreators } from 'redux';
import { loggedInUserSelector } from '../state/users/reducer';

const drawerWidth = 200


const styles = theme => ({

    hide: {


    },
    drawerPaper: {
        borderRight: '1px solid #8e8e8e52',
        padding: '0 10px 0 10px',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        [theme.breakpoints.down('sm')]: { width: '300px', },

        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        [theme.breakpoints.down('md')]: { width: '0', padding: 0 },
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // width: theme.spacing.unit * 7,
        // [theme.breakpoints.up('sm')]: {
        //     width: theme.spacing.unit * 9,
        // },
    },

    toggleButton: {
        bottom: "0px",
        position: "absolute"
    },
    toolbarSpacer: theme.mixins.toolbar





});

const mapStateToProps = state => ({ currentUser: loggedInUserSelector(state), isSideBarOpen: sideBarOpenSelector(state) });
const mapDistpachToProps = (dispatch) => bindActionCreators({ setSideBarOpen }, dispatch)

@connect(mapStateToProps, mapDistpachToProps, null, { pure: false })
class SideMenuComponent extends Component {

    constructor(props) {
        super(props)


        this.handleDrawerClose = this.handleDrawerClose.bind(this)
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    }


    handleDrawerOpen() {
        this.props.setSideBarOpen(true)
    }


    handleDrawerClose() {
        this.props.setSideBarOpen(false)
    }



    render() {
        const { classes, isSideBarOpen, currentUser } = this.props;
        return (


            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.hide, classes.drawerPaper, !isSideBarOpen && classes.drawerPaperClose),
                }}
                open={isSideBarOpen}
            >

                <div className={classes.toolbarSpacer}></div>


                <Divider />
                <List>
                    {currentUser.type === "student" && <SideMenuLink text="Dashbaord" to="/dashboard" onClick={this.handleDrawerClose} icon={DashboardRoundedIcon} />}
                    {currentUser.type === "teacher" && <SideMenuLink text="Info Panel" to="/tdashboard" onClick={this.handleDrawerClose} icon={DashboardRoundedIcon} />}
                    {currentUser.type === "student" && <SideMenuLink disabled={currentUser.path ? false : true} text="Course Path" to="/path" onClick={this.handleDrawerClose} icon={LibraryBooks} />}
                    {currentUser.type === "teacher" && <SideMenuLink title="Studetns without learing path" text="Pathless Students" to="/pathless" onClick={this.handleDrawerClose} icon={NewReleaseIcon} />}
                    {currentUser.type === "teacher" && <SideMenuLink title="Registered students list" text="Students" to="/students" onClick={this.handleDrawerClose} icon={PeopleIcon} />}
                    {currentUser.type === "teacher" && <SideMenuLink title="New project submissions" text="Submissions" to="/new-submissions" onClick={this.handleDrawerClose} icon={NewReleaseIcon} />}
                    <SideMenuLink text="Q & A" to="/qa" onClick={this.handleDrawerClose} icon={QuestionAnswerIcon} />
                    {currentUser.type === "teacher" && <SideMenuLink title="Courses and Stages" text="Content" to="/courses" onClick={this.handleDrawerClose} icon={QuestionAnswerIcon} />}
                    <SideMenuLink text="Teachers" to="/teacher-contact" onClick={this.handleDrawerClose} icon={ContactsIcon} />

                </List>

                <Divider />



            </Drawer>

        );
    }

    toggleButton() {
        const { classes, isSideBarOpen } = this.props;


        return (<List className={classes.toggleButton}>
            {isSideBarOpen ?
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





}

function SideMenuLink({ to, text, onClick, icon, disabled = false, title }) {
    const LinkIcon = icon
    return (<ListItem title={title} button component={NavLink} to={to} onClick={onClick} disabled={disabled}>
        <ListItemIcon>
            <LinkIcon />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ variant: "body2" }} primary={text} />
    </ListItem>)
}



SideMenuComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};



const SideMenu = withStyles(styles, { withTheme: true })(SideMenuComponent);
SideMenu.displayName = "StyledSideMenu";
export default SideMenu;

