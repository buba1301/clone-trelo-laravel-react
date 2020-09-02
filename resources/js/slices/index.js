import { combineReducers } from 'redux';
import { registration, registrationActions, singUp } from './registration';
import {
  session, sessionActions, signIn, getCurrentUser,
} from './session';

const actions = {
  ...registrationActions,
  ...sessionActions,
};

const asyncActions = {
  singUp,
  signIn,
  getCurrentUser,
};

export {
  actions,
  asyncActions,
};

export const createRootReducer = () => combineReducers({
  registration,
  session,
});
