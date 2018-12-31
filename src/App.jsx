import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Router, Switch } from "react-router-dom";
import CoursersPathContainer from "./components/coursers-path/CoursersPathContainer";
import InCourseContainer from "./components/in-course/InCourseContainer";
import LoginScreen from "./components/LoginScreen";
import NavBar from "./components/NavBar";
import PathCreationContainer from "./components/pathless-users/PathCreationContainer";
import PathLessStudentsContainer from "./components/pathless-users/PathLessStudentsContainer";
import PrivateRoute from './components/PrivateRoute';
import QAPageContainer from "./components/qa/QAPageContainer";
import SideMenu from "./components/SideMenu";
import TeacherDashbaord from "./components/teacher-dashbaord/TeacherDashbaord";
import TeacherContactListContainer from "./components/teachers-cotanctlist/TeacherContactListContainer";
import history from './history';
import { loggedInUserSelector } from "./state/users/reducer";
import QuestionContainer from "./components/qa/QuestionContainer";
import UserInfoContainer from "./components/user-profile/UserInfoContainer";
import StudentDashboard from "./components/student-dashbaord/StudentDashboard";
import CoursesContainer from "./components/coureses/CoursesContainer"
import StageContainer from "./components/coureses/StageContainer";
import CourseContainer from "./components/coureses/CourseContainer";
import SubmittedProjectsContainer from "./components/project-submissions/SubmittedProjectsContainer";
import CheckSubmissionContainer from "./components/check-submission/CheckSubmissionContainer";


const style = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  appRoot: {
    minHeight: '100vh',
    display: "flex",
    flexDirection: 'column'
  },
  content: {

    margin: "30px 0",
    display: "flex",
    margin: "0 auto",
    marginTop: '20px',
    width: "90%",

    [theme.breakpoints.up('lg')]: {

      width: "80%",
      padding: '0 100px 0 100px',
    },

  }
})

function mapStateToProps(state) {
  return {
    user: loggedInUserSelector(state)
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
              <PrivateRoute path="/incourse" authed={user} component={this.CourseLayout.bind(this)} />
              <PrivateRoute path="/" authed={user} component={this.MainLayout.bind(this)} />

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

          <Switch>


            <Route path="/path" component={CoursersPathContainer} />
            <Route path="/qa" component={QAPageContainer} />
            <Route path="/user" component={UserInfoContainer} />
            <Route path="/course" component={InCourseContainer} />
            <Route path="/pathless" component={PathLessStudentsContainer} />
            <Route path="/path-creation/:id" component={PathCreationContainer} />
            <Route path="/tdashboard" component={TeacherDashbaord} />
            <Route path="/dashboard" component={StudentDashboard} />
            <Route path="/new-submissions" component={SubmittedProjectsContainer} />
            <Route path="/check-submission/:id" component={CheckSubmissionContainer} />
            <Route path="/courses/:id" component={CourseContainer} />
            <Route exact path="/courses" component={CoursesContainer} />
            <Route path="/stages/:id" component={StageContainer} />
            <Route path="/teacher-contact" component={TeacherContactListContainer} />
            <Route path="/question/:questionId" component={QuestionContainer} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }

  CourseLayout = () => {
    let { classes } = this.props;
    return (

      <React.Fragment>

        <div className={classes.appBarSpacer} ></div>
        <Route path="/incourse/:courseId/:stageId" component={InCourseContainer} />
      </React.Fragment>
    )
  }
}



const AppWithStyles = connect(mapStateToProps)(withStyles(style)(App));




export { AppWithStyles as App };

