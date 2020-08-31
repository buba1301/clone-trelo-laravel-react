import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import routes from '../routes';

const slice = createSlice({
  name: 'session',
  initialState: {
    currentUser: null,
    socket: null,
    channel: null,
    error: null,
  },
  reducers: {

  },
});

const session = slice.reduce;
const sessionActions = slice.actions;

export { session, sessionActions };
