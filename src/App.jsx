import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import CheckSubmissionContainer from "./components/check-submission/CheckSubmissionContainer";
import CourseContainer from "./components/coureses/CourseContainer";
import CoursesContainer from "./components/coureses/CoursesContainer";
import StageContainer from "./components/coureses/StageContainer";
import CoursersPathContainer from "./components/coursers-path/CoursersPathContainer";
import InCourseContainer from "./components/in-course/InCourseContainer";
import LoginScreen from "./components/LoginScreen";
import NavBar from "./components/NavBar";
import PathCreationContainer from "./components/pathless-users/PathCreationContainer";
import PathLessStudentsContainer from "./components/pathless-users/PathLessStudentsContainer";
import PrivateRoute from './components/PrivateRoute';
import SubmittedProjectsContainer from "./components/project-submissions/SubmittedProjectsContainer";
import QAPageContainer from "./components/qa/QAPageContainer";
import QuestionContainer from "./components/qa/QuestionContainer";
import SideMenu from "./components/SideMenu";
import StudentDashboard from "./components/student-dashbaord/StudentDashboard";
import TeacherDashbaord from "./components/teacher-dashbaord/TeacherDashbaord";
import TeacherContactListContainer from "./components/teachers-cotanctlist/TeacherContactListContainer";
import RegisterContainer from "./components/user-profile/RegisterContainer";
import UserInfoContainer from "./components/user-profile/UserInfoContainer";
import history from './history';
import { fetchCurrentUser } from "./state/users/actions";
import { loggedInUserIdSelector, usersApiSelector } from "./state/users/reducer";




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
    loggedInUser: loggedInUserIdSelector(state),
    isLoadingUser: usersApiSelector(state).isLoading
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUser }, dispatch)
}

class App extends Component {

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    const { user, classes, loggedInUser, isLoadingUser } = this.props;
    console.log(isLoadingUser)

    return (




      <React.Fragment>
        {isLoadingUser}
        {!isLoadingUser && <Router history={history}>
          <div className={classes.appRoot} >


            <Switch>
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterContainer} />
              <PrivateRoute path="/incourse" authed={loggedInUser} component={this.CourseLayout.bind(this)} />
              <PrivateRoute path="/" authed={loggedInUser} component={this.MainLayout.bind(this)} />


            </Switch>
          </div>
        </Router>
        }


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
            <Redirect to="/dashboard" />
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



const AppWithStyles = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(App));




export { AppWithStyles as App };

