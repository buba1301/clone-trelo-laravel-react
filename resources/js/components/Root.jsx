import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, IndexRoute,
} from 'react-router-dom';
import MainLayout from './MainLayout.jsx';
import RegistrationsNew from './RegistrationNew.jsx';

const Root = () => (
    <Router>
        <Switch>
            <Route component={MainLayout}>
                <Route path="/" component={RegistrationsNew} />
            </Route>
        </Switch>
    </Router>
);

export default Root;
