import { combineReducers } from 'redux';
import { registration, registrationActions, singUp } from './registration';
import {
  session, sessionActions, signIn, getCurrentUser, signOut,
} from './session';
import {
  boards, boardsActions, boardsFetching, createBoard,
} from './boards';

const actions = {
  ...registrationActions,
  ...sessionActions,
  ...boardsActions,
};

const asyncActions = {
  singUp,
  signIn,
  getCurrentUser,
  signOut,
  boardsFetching,
  createBoard,
};

export {
  actions,
  asyncActions,
};

export const createRootReducer = () => combineReducers({
  registration,
  session,
  boards,
});
