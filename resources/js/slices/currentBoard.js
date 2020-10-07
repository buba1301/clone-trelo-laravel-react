import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'currentBoard',
  initialState: {
    channel: '',
    board: {},
    members: [],
    showAddNewUserModal: false,
    // fetching: true,
    errors: {},
  },
  reducers: {
    addBoard: (state, { payload: { board } }) => ({ ...state, board }),
    addMembers: (state, { payload: { members } }) => ({ ...state, members }),
    showAddNewUserModal: (state, { payload }) => ({ ...state, showAddNewUserModal: payload }),
    addErrors: (state, { payload: { errors } }) => ({ ...state, errors }),
  },
});

const currentBoardActions = slice.actions;
const currentBoard = slice.reducer;

const connectToChannel = (channel) => async (dispatch) => {
  channel
    .here(([data]) => {
      const [board, members] = data;
      dispatch(currentBoardActions.addBoard({ board }));
      dispatch(currentBoardActions.addMembers({ members }));
      console.log(board, members);
    })
    .joining((data) => {
      console.log(data);
    })
    .listen('AddUserOnBoard', (e) => {
      console.log(e);
    });
};

const addUserOnBoard = (data, authToken, channel) => async (dispatch) => {
  const url = routes.AddUserOnBoardPath();

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const { members } = res.data;
    dispatch(currentBoardActions.addMembers({ members }));
  } catch (e) {
    const errors = e.response.data;
    dispatch(currentBoardActions.addErrors({ errors }));
    throw (e);
  }
};

export {
  currentBoardActions,
  currentBoard,
  connectToChannel,
  addUserOnBoard,
};
