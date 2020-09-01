import { combineReducers } from 'redux';
import { registration, registrationActions, singUp } from './registration';

const actions = {
  ...registrationActions,
};

const asyncActions = {
  singUp,
};

export {
  actions,
  asyncActions,
};

export const createRootReducer = () => combineReducers({
  registration,
});
