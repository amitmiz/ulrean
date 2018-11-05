import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route ,Switch} from "react-router-dom";
import { CoursersCatalog } from "./components/coursers-catalog/coursers-catalog";
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


const style = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    padding: '0 100px 0 100px',
    margin: "30px 0",
    display: "flex",
    'min-height': '400px'
  }
})


@inject('authStore')
@observer
class App extends Component {


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
        <NavBar />

        <SideMenu />

        <div className={classes.appBarSpacer} ></div>

        <div className={classes.content} >
          <Switch>
            <Route path="/catalog" component={CoursersCatalog} />
            <Route path="/qa" component={QAPage} />
            <Route path="/user" component={UserInfo} />
            <Route path="/course" component={InCourse} />
            <Route path="/pathless" component={PathLessStudents} />
            <Route path="/path-creation/:id" component={PathCreation} />
            <Route path="/tdashboard" component={TeacherDashbaord} />

            <Redirect to="/" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }



  render() {
    const { authStore } = this.props;
    console.log(this.props)

    return (
      <React.Fragment>

        <Router>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* {authStore.isLoggedIn ? this.WhenLogged() : this.WhenNotLogged()} */}
     {this.WhenLogged()} }
            
          </div>

        </Router>
      </React.Fragment >

    );

  }

}





const AppWithStyles = withStyles(style)(App);


export { AppWithStyles as App } 