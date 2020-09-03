import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import { asyncActions } from '../slices/index';

const AuthenticatedContainer = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  console.log(currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = localStorage.getItem('laravelToken');

  // localStorage.removeItem('laravelToken');

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(asyncActions.getCurrentUser(authToken));
    };

    if (authToken && !currentUser.id) {
      try {
        fetchUser();
      } catch (e) {
        console.log(e.response); /// add show error
      }
    } else if (!authToken) {
      history.push('/sign_up');
    }
  }, [currentUser.id]);

  return (
      <div className="application-container">
          <Header
            user={currentUser}
            dispatch={dispatch}
            history={history}
          />

          <div className="main-container">
              <Main />
          </div>
      </div>
  );
};

export default AuthenticatedContainer;
