import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'boards',
  initialState: {
    boards: [],
    showForm: false,
    errors: null,
    fetching: true,
  },
  reducers: {
    setBoards: (state, { payload }) => ({ ...state, boards: payload, fetching: false }),
    addBoard: (state, { payload }) => ({ ...state, boards: [...state.boards, payload] }),
    setShowForm: (state, { payload }) => ({ ...state, showForm: payload }),
    boardsErrors: (state, { payload }) => ({ ...state, errors: payload }),
  },
});

const boardsActions = slice.actions;
const boards = slice.reducer;

const boardsFetching = (authToken) => async (dispatch) => {
  const url = routes.boardsPath();

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  dispatch(boardsActions.setBoards(res.data));
};

const createBoard = (data, authToken) => async (dispatch) => {
  const url = routes.boardsPath();

  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { board } = res.data;

  dispatch(boardsActions.addBoard(board));
};

export {
  boardsActions, boards, boardsFetching, createBoard,
};
