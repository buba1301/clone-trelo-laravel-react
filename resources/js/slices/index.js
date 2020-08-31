import { combineReducers } from 'redux';
import { session } from './session';

export const createRootReducer = () => combineReducers({
  session,
});
