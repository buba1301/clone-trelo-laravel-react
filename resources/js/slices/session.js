import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import echo from '../bootstrap';

const slice = createSlice({
  name: 'session',
  initialState: {
    currentUser: {},
    socket: null,
    channel: null,
    errors: {},
    fetchingUser: false,
  },
  reducers: {
    addCurrentUser: (state, { payload }) => ({ ...state, currentUser: payload }),
    userSignOut: (state, { payload }) => ({ ...state, currentUser: {} }),
    loginErrors: (state, { payload }) => ({ ...state, errors: payload }),
    setFetchihg: (state, { payload }) => ({ ...state, fetchingUser: payload }),
  },
});

const session = slice.reducer;
const sessionActions = slice.actions;

const signIn = (loginFormData) => async (dispatch) => {
  dispatch(sessionActions.setFetchihg(true));

  const url = routes.loginPath();

  const res = await axios.post(url, loginFormData);

  const { token, user } = res.data;

  localStorage.setItem('laravelToken', token);

  dispatch(sessionActions.addCurrentUser(user));
};

const getCurrentUser = (authToken) => async (dispatch) => {
  const url = routes.userPath();
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { user } = res.data;

  dispatch(sessionActions.addCurrentUser(user));
};

const signOut = () => async (dispatch) => {
  localStorage.removeItem('laravelToken');

  dispatch(sessionActions.userSignOut());
};

export {
  session, sessionActions, signIn, getCurrentUser, signOut,
};
