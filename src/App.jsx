import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { CoursersCatalog } from "./components/coursers-path/coursers-path";
import { InCourse } from "./components/in-course.component";
import { LoginScreen } from "./components/login-screen.component";
import NavBar from "./components/navbar.component";
import { QAPage } from "./components/qa/qa-page.component";
import { SideMenu } from "./components/side-menu";
import { UserInfo } from "./components/user-info.component";
import { inject, observer } from "mobx-react";
import { PathCreation } from "./components/path-creation";
import { PathLessStudents } from "./components/pathless-students.component";
import { TeacherDashbaord } from "./components/teacher-dashbaord.component";
import { TeacherContactList } from "./components/teachers-contactlist.component";
import CourseNavBar from './components/incourser-navbar.component.'


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



class App extends Component {


  render() {
    const { authStore } = this.props;
    console.log(this.props)

    return (
      <React.Fragment>

        <Router>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {this.WhenLogged()}

          </div>

        </Router>
      </React.Fragment >

    );

  }

  WhenNotLogged = () => {
    return (
      <React.Fragment>
        <Route path="/login" component={LoginScreen} />
        <Redirect to="/login"></Redirect>
      </React.Fragment>

    )
  }

  WhenLogged = () => {
    const { classes } = this.props;

    return (
      <React.Fragment>

        <Switch>
          <Route path="/incourse" component={this.CourseLayout.bind(this)} >



          </Route>

          <Route path="/" component={this.MainLayout.bind(this)}>




          </Route>


          <Redirect to="/" />
        </Switch>

      </React.Fragment>
    );
  }

  MainLayout = () => {
    let { classes } = this.props;

    return (<React.Fragment>

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





const AppWithStyles = withStyles(style)(App);


export { AppWithStyles as App } 