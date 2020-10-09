import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { sessionActions } from './session';

const slice = createSlice({
  name: 'registration',
  initialState: {
    errors: {},
    regUIState: { disableSubmitButton: false },
    fetching: false,
  },
  reducers: {
    registrationErrors: (state, { payload }) => ({ ...state, errors: { ...payload } }),
    setSubmitButton: (state, { payload }) => {
      const { regUIState } = state;
      regUIState.disableSubmitButton = payload;
      return state;
    },
    setFetching: (state, { payload }) => ({ ...state, fetching: payload }),
  },
});

const registrationActions = slice.actions;
const registration = slice.reducer;

const singUp = (registrationFormData) => async (dispatch) => {
  dispatch(registrationActions.setFetching(true));

  const url = routes.registrationPath();

  const res = await axios.post(url, registrationFormData);

  const { token, user } = res.data;

  localStorage.setItem('laravelToken', token);

  dispatch(sessionActions.addCurrentUser(user));
};

export { registration, registrationActions, singUp };
