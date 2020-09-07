import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Header from './Header.jsx';
import Main from './Main.jsx';
import { actions, asyncActions } from '../slices/index';

const AuthenticatedContainer = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  const errors = useSelector((state) => state.session.errors);
  console.log(currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  // localStorage.setItem('laravelToken', 'fghrjreej');
  const authToken = localStorage.getItem('laravelToken'); // может быть использовать Context

  useEffect(() => {
    if (authToken && !currentUser.id) {
      const fetchUser = async () => {
        try {
          await dispatch(asyncActions.getCurrentUser(authToken));
        } catch (e) {
          const { data } = e.response;
          console.log(data);
          dispatch(actions.loginErrors(data));
        }
      };
      fetchUser();
    } else if (!authToken) {
      history.push('/sign_up');
    }
  }, [currentUser.id]);

  if (errors.status) {
    return (
        <Alert variant="danger">
            {errors.status}. Try again <Alert.Link href="/sign_in">SignIn</Alert.Link>
        </Alert>
    );
  }

  return (
        <div className="application-container">
          <Header
            user={currentUser}
            dispatch={dispatch}
            history={history}
          />

          <div className="main-container">
            <Main token={authToken} userId={currentUser.id}/>
          </div>
        </div>
  );
};

export default AuthenticatedContainer;
