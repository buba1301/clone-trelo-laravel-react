/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const slice = createSlice({
  name: 'currentBoard',
  initialState: {
    channel: '',
    board: {},
    members: [],
    lists: {},
    tasks: {},

    membersUIState: {},
    listsUIState: {},
    tasksUiState: {},

    showAddNewUserModal: false,
    showAddNewListForm: false,

    // fetching: true,
    errors: {},
  },
  reducers: {
    addBoard: (state, { payload: { board } }) => ({ ...state, board }),
    addMembers: (state, { payload: { members } }) => ({ ...state, members }),
    addNewList: (state, { payload: { lists } }) => ({ ...state, lists }),
    addNewTasks: (state, { payload: { tasks } }) => ({ ...state, tasks }),

    addNewTaskUIState: (state, { payload: { tasksUIState } }) => (({
      ...state,
      tasksUIState,
    })),
    addNewListsUIState: (state, { payload }) => (({
      ...state,
      listsUIState: payload,
    })),

    showAddNewUserModal: (state, { payload }) => ({
      ...state,
      showAddNewUserModal: payload,
    }),
    showAddNewListForm: (state, { payload }) => ({
      ...state,
      showAddNewListForm: payload,
    }),
    showEditNameListForm: (state, { payload: { id, showForm } }) => {
      const { listsUIState } = state;
      const list = listsUIState.byId[id];
      list.showEditNameListForm = showForm;
      return state;
    },
    showAddNewTaskFrom: (state, { payload: { id, showForm } }) => {
      const { tasksUIState } = state;
      const task = tasksUIState.byId[id];
      task.showAddNewTaskFrom = showForm;
      return state;
    },
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
    throw (e);
    // dispatch(currentBoardActions.addErrors({ errors }));
  }
};

export {
  currentBoardActions,
  currentBoard,
  connectToChannel,
  addUserOnBoard,
};
