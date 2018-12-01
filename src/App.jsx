import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Router, Switch } from "react-router-dom";
import { CoursersCatalogContainer } from "./components/coursers-path/course-path-container";
import { InCourseContainer } from "./components/in-course/in-course.container";
import { LoginScreen } from "./components/login-screen.component";
import NavBar from "./components/navbar.component";
import { PathCreation } from "./components/pathless-users/path-creation";
import  PathLessStudentsContainer from "./components/pathless-users/pathless-students.container";
import PrivateRoute from './components/private-route';
import { QAPage } from "./components/qa/qa-page.component";
import { SideMenu } from "./components/side-menu";
import { TeacherDashbaord } from "./components/teacher-dashbaord.component";
import { TeacherContactList } from "./components/teachers-contactlist.component";
import { UserInfo } from "./components/user-info.component";
import history from './history';

const style = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  appRoot: {
    minHeight: '100vh',
    display: "flex",
    flexDirection: 'column'
  },
  content: {
    padding: '0 100px 0 100px',
    margin: "30px 0",
    display: "flex",
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
    const { user, classes } = this.props;

    return (
      <React.Fragment>

        <Router history={history}>
          <div className={classes.appRoot} >


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

          <Route path="/path" component={CoursersCatalogContainer} />
          <Route path="/qa" component={QAPage} />
          <Route path="/user" component={UserInfo} />
          <Route path="/course" component={InCourseContainer} />
          <Route path="/pathless" component={PathLessStudentsContainer} />
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

        <div className={classes.appBarSpacer} ></div>
        <Route path="/incourse" component={InCourseContainer} />
      </React.Fragment>
    )
  }
}



const AppWithStyles = connect(mapStateToProps)(withStyles(style)(App));




export { AppWithStyles as App };

