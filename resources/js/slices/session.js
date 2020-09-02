import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
// import routes from '../routes';

const slice = createSlice({
  name: 'session',
  initialState: {
    currentUser: {},
    socket: null,
    channel: null,
    errors: {},
  },
  reducers: {
    addCurrentUser: (state, { payload }) => ({ ...state, currentUser: payload }),
    loginErrors: (state, { payload }) => ({ ...state, errors: payload }),
  },
});

const session = slice.reducer;
const sessionActions = slice.actions;

const signIn = (loginFormData) => async (dispatch) => {
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
      authorization: authToken,
    },
  });

  const { user } = res.data;

  dispatch(sessionActions.addCurrentUser(user));
  console.log(res);
};

export {
  session, sessionActions, signIn, getCurrentUser,
};
