import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createRootReducer } from '../slices';

// export const history = createBrowserHistory();

/* const thunkMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
}); */

const store = configureStore({
  reducer: createRootReducer(),
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
