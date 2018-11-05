import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App'
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';
import { Provider } from "mobx-react";
import { AuthStore } from "./stores/auth.store";
import { CssBaseline } from "@material-ui/core"
import { UserStore } from './stores/user.store';



function Container() {
    return (<React.Fragment>
        <CssBaseline />
        <Provider authStore={new AuthStore()} userStore={new UserStore()} >
            <App />
        </Provider>
    </React.Fragment>)
}


ReactDOM.render(<Container />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
