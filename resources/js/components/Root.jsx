import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import AuthenticatedContainer from './AuthenticatedContainer.jsx';
import RegistrationsNew from './RegistrationNew.jsx';
import SessionNew from './SessionNew.jsx';
import BoardShowView from './BoardShowView.jsx';
import Main from './Main.jsx';

const Root = () => (
    <Router>
        <Switch>
            <Route path="/sign_up">
                <RegistrationsNew />
            </Route>
            <Route path="/sign_in">
                <SessionNew />
            </Route>

            <Route>
                <AuthenticatedContainer>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/boards/:id">
                        <BoardShowView />
                    </Route>
                </AuthenticatedContainer>
            </Route>
        </Switch>
    </Router>
);

export default Root;
