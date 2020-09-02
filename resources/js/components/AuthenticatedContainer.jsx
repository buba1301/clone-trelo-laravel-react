import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  Form, FormGroup, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import { getErrors, setDocumentTitle } from '../utils';
import { asyncActions, actions } from '../slices/index';

const AuthenticatedContainer = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  console.log(currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = localStorage.getItem('laravelToken');
  console.log(!currentUser);

  const getUser = async () => {
    await dispatch(asyncActions.getCurrentUser(authToken));
  };

  useEffect(() => {
    if (authToken && !currentUser) {
      getUser();
    } else if (!authToken) {
      history.push('/sign_up');
    }
  });

  return (
      <div className="application-container">
          <Header />

          <div className="main-container">
              <Main />
          </div>
      </div>
  );
};

export default AuthenticatedContainer;
