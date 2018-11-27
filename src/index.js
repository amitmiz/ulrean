import { CssBaseline } from "@material-ui/core";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as Redux } from "react-redux";
import 'typeface-roboto';
import { App } from './App';
import './index.css';
import { createStore } from './redux/createStore';
import * as serviceWorker from './serviceWorker';


function Container() {
    return (<React.Fragment>
        <CssBaseline />

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
