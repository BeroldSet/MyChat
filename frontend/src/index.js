import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from "react-router";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import LogIn from './components/LogIn';
import { Chat } from './components/Chat';

import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const store = createStore(rootReducer, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <Router history={history}>
            <Route exact path="/" component={LogIn} />
            <Route path="/chat" component={Chat} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
