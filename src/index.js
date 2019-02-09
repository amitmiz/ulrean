import { CssBaseline } from "@material-ui/core";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as Redux } from "react-redux";
import 'typeface-roboto';
import { App } from './App';
import './index.css';
import { createStore } from './redux/createStore';
import * as serviceWorker from './serviceWorker';
import Helmet from "react-helmet";
import Axios from "axios";

Axios.defaults = {withCredentials : true}

function Container() {
    return (<React.Fragment>
        <CssBaseline />
        <Helmet>
            <title>Ulrean</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        <Redux store={createStore()} >
            <App />
        </Redux>

    </React.Fragment>)
}


ReactDOM.render(<Container />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
