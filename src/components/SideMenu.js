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
import { connect } from 'react-redux';
import { sideBarOpenSelector } from '../state/ui/reducer';
import { setSideBarOpen } from '../state/ui/actions'
import { bindActionCreators } from 'redux';

const drawerWidth = 200


const styles = theme => ({

    hide: {

  
    },
    drawerPaper: {
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
        [theme.breakpoints.down('sm')]: { width: '0', },
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

const mapStateToProps = state => ({ isSideBarOpen: sideBarOpenSelector(state) });
const mapDistpachToProps = (dispatch) => bindActionCreators({ setSideBarOpen }, dispatch)

@connect(mapStateToProps,mapDistpachToProps)
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
        const { classes, isSideBarOpen } = this.props;
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




                    <ListItem button component={NavLink} to="/path" onClick={this.handleDrawerClose}>
                        <ListItemIcon>
                            <LibraryBooks />
                        </ListItemIcon>
                        <ListItemText primary="Course Path" />
                    </ListItem>

                    <ListItem button component={NavLink} to="/tdashboard" onClick={this.handleDrawerClose}>
                        <ListItemIcon>
                            <DashboardRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashbaord" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/pathless" onClick={this.handleDrawerClose} >
                        <ListItemIcon>
                            <NewReleaseIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pathless" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/qa" onClick={this.handleDrawerClose} >
                        <ListItemIcon>
                            <QuestionAnswerIcon />
                        </ListItemIcon>
                        <ListItemText primary="QA" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/teacher-contact" onClick={this.handleDrawerClose}>
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Teachers" />
                    </ListItem>


                </List>

                <Divider />


                {this.toggleButton()}

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



SideMenuComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};



const SideMenu = withStyles(styles, { withTheme: true })(SideMenuComponent);
SideMenu.displayName = "StyledSideMenu";
export default SideMenu;
