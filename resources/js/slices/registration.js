import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'registration',
  initialState: {
    errors: {},
  },
  reducers: {
    registrationErrors: (state, { payload }) => ({ errors: { ...payload } }),
  },
});

const registrationActions = slice.actions;
const registration = slice.reducer;

const singUp = (registrationFormData) => async (dispatch) => {
  const url = routes.registrationPath();

  const res = await axios.post(url, registrationFormData);

  const { token, user } = res.data;

  localStorage.setItem('laravelToken', token);
};

export { registration, registrationActions, singUp };
