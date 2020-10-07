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
    showDeleteModal: false,
  },
  reducers: {
    setBoards: (state, { payload }) => ({ ...state, boards: payload, fetching: false }),
    addBoard: (state, { payload }) => ({ ...state, boards: [...state.boards, payload] }),
    setShowForm: (state, { payload }) => ({ ...state, showForm: payload }),
    boardsErrors: (state, { payload }) => ({ ...state, errors: payload }),
    deleteBoard: (state, { payload: { currentBoardId } }) => {
      const filterBoards = state.boards.filter(({ id }) => id !== currentBoardId);
      return { ...state, boards: filterBoards };
    },
    showDeleteModal: (state, { payload }) => ({ ...state, showDeleteModal: payload }),
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

const createBoard = (data, authToken, history) => async (dispatch) => {
  const url = routes.boardsPath();

  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { board } = res.data;
  dispatch(boardsActions.addBoard(board));

  history.push(`/boards/${board.id}`);
};

const fetchDeleteBoard = (currentBoardId, authToken) => async (dispatch) => {
  const url = routes.boardsPathDelete(currentBoardId);
  await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  dispatch(boardsActions.deleteBoard({
    currentBoardId,
  }));
};

export {
  boardsActions, boards, boardsFetching, createBoard, fetchDeleteBoard,
};
