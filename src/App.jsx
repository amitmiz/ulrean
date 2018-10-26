import { withStyles } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CoursersCatalog } from "./components/coursers-catalog/coursers-catalog";
import NavBar from "./components/navbar.component";
import { SideMenu } from "./components/side-menu";


const style = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    padding: '0 100px 0 100px',
    margin: "30px 0",
    display : "flex",
    'min-height' : '400px'
  }
})



const App = ({ classes }) => (

  <React.Fragment>
    <CssBaseline />

    <Router>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NavBar />

        <SideMenu />

        <div className={classes.appBarSpacer} ></div>

        <div className={classes.content} >

          <Route path="/catalog" component={CoursersCatalog} />
        </div>



      </div>
    </Router>
  </React.Fragment >

);


export default withStyles(style)(App);