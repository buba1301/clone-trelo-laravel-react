import { combineReducers } from 'redux';
import { registration, registrationActions, singUp } from './registration';
import {
  session, sessionActions, signIn, getCurrentUser, signOut,
} from './session';
import {
  boards, boardsActions, boardsFetching, createBoard, fetchDeleteBoard,
} from './boards';
import {
  currentBoardActions,
  currentBoard,
  connectToChannel,
  addUserOnBoard,
} from './currentBoard';

const actions = {
  ...registrationActions,
  ...sessionActions,
  ...boardsActions,
  ...currentBoardActions,
};

const asyncActions = {
  singUp,
  signIn,
  getCurrentUser,
  signOut,
  boardsFetching,
  createBoard,
  fetchDeleteBoard,
  connectToChannel,
  addUserOnBoard,
};

export {
  actions,
  asyncActions,
};

export const createRootReducer = () => combineReducers({
  registration,
  session,
  boards,
  currentBoard,
});
