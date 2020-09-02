import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import AuthenticatedContainer from './AuthenticatedContainer.jsx';
import RegistrationsNew from './RegistrationNew.jsx';
import SessionNew from './SessionNew.jsx';

const Root = () => (
    <Router>
        <Switch>
            <Route path="/sign_up">
                <RegistrationsNew />
            </Route>
            <Route path="/sign_in">
                <SessionNew />
            </Route>
            <Route exact path="/">
                <AuthenticatedContainer />
            </Route>
        </Switch>
    </Router>
);

export default Root;
