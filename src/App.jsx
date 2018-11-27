import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import React, { Component } from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import { CoursersCatalog } from "./components/coursers-path/coursers-path";
import { InCourse } from "./components/in-course/in-course.component";
import CourseNavBar from './components/in-course/incourse-navbar.component.';
import { LoginScreen } from "./components/login-screen.component";
import NavBar from "./components/navbar.component";
import { PathCreation } from "./components/path-creation";
import { PathLessStudents } from "./components/pathless-students.component";
import { QAPage } from "./components/qa/qa-page.component";
import { SideMenu } from "./components/side-menu";
import { TeacherDashbaord } from "./components/teacher-dashbaord.component";
import { TeacherContactList } from "./components/teachers-contactlist.component";
import { UserInfo } from "./components/user-info.component";
import PrivateRoute from './components/private-route';
import history from './history';

const style = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    padding: '0 100px 0 100px',
    margin: "30px 0",
    display: "flex",
    'min-height': '400px',
    margin: "0 auto",
    marginTop: '20px',

    [theme.breakpoints.up('lg')]: {

      width: "80%"
    },

  }
})

function mapStateToProps(state) {
  return {
    user: state.user
  }
}


class App extends Component {


  render() {
    const { user } = this.props;

    return (
      <React.Fragment>

        <Router history={history}>
          <div style={{ display: "flex", flexDirection: "column" }}>


            <Switch>
              <Route path="/login" component={LoginScreen} />
              <PrivateRoute path="/incourse" authed={user.data} component={this.CourseLayout.bind(this)} />
              <PrivateRoute path="/" authed={user.data} component={this.MainLayout.bind(this)} />

            </Switch>
          </div>
        </Router>
      </React.Fragment >

    );

  }


  MainLayout = () => {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.appBarSpacer} ></div>
        <NavBar />
        <SideMenu />
        <div className={classes.content} >

          <Route path="/path" component={CoursersCatalog} />
          <Route path="/qa" component={QAPage} />
          <Route path="/user" component={UserInfo} />
          <Route path="/course" component={InCourse} />
          <Route path="/pathless" component={PathLessStudents} />
          <Route path="/path-creation/:id" component={PathCreation} />
          <Route path="/tdashboard" component={TeacherDashbaord} />
          <Route path="/teacher-contact" component={TeacherContactList} />
        </div>
      </React.Fragment>
    )
  }

  CourseLayout = () => {
    let { classes } = this.props;
    return (

      <React.Fragment>
        <CourseNavBar />
        <div className={classes.appBarSpacer} ></div>
        <Route path="/incourse" component={InCourse} />
      </React.Fragment>
    )
  }
}



const AppWithStyles = connect(mapStateToProps)(withStyles(style)(App));




export { AppWithStyles as App };
