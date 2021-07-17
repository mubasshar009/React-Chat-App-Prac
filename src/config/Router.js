import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../containers/Home/index';
import Chat from '../containers/Chat/index';

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Home}></Route>
                <Route path="/chat" component={Chat}></Route>
            </Router>
        );
    }
};

export default AppRouter;


