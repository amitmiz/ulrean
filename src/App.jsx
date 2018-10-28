import { withStyles } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { CoursersCatalog } from "./components/coursers-catalog/coursers-catalog";
import { InCourse } from "./components/in-course.component";
import { LoginScreen } from "./components/login-screen.component";
import NavBar from "./components/navbar.component";
import { QAPage } from "./components/qa/qa-page.component";
import { SideMenu } from "./components/side-menu";
import { UserInfo } from "./components/user-info.component";


const style = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    padding: '0 100px 0 100px',
    margin: "30px 0",
    display: "flex",
    'min-height': '400px'
  }
})


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

          <Route path="/catalog" component={CoursersCatalog} />
          <Route path="/qa" component={QAPage} />
          <Route path="/user" component={UserInfo} />
          <Route path="/course" component={InCourse} />
        </div>
      </React.Fragment>
    );
  }



  render() {
    return (
      <React.Fragment>
        <CssBaseline />

        <Router>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {false ? this.WhenLogged() : this.WhenNotLogged()}
          </div>
        </Router>
      </React.Fragment >

    );

  }

}





export default withStyles(style)(App);