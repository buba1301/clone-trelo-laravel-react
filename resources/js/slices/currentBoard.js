/* eslint-disable no-useless-catch */
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
    lists: [],
    tasks: [],

    membersUIState: {},
    listsUIState: {},
    tasksUIState: {},

    showAddNewUserModal: false,
    showAddNewListForm: false,

    fetching: false,
    errors: {},
  },
  reducers: {
    addBoard: (state, { payload: { board } }) => ({ ...state, board }),
    addMembers: (state, { payload: { members } }) => ({ ...state, members }),
    addLists: (state, { payload: { lists } }) => ({ ...state, lists }),
    addNewTasks: (state, { payload: { tasks } }) => {
      const mappedTasks = tasks.reduce((acc, { id }) => {
        const { byId, allIds } = acc;
        return {
          ...acc,
          byId: { ...byId, [id]: { showEditNameTaskForm: false } },
          allIds: [...allIds, id],
        };
      }, { byId: {}, allIds: [] });
      return { ...state, tasks, tasksUIState: mappedTasks };
    },

    createListsUIState: (state, { payload: { lists } }) => {
      const mappedLists = lists.reduce((acc, { id }) => {
        const { byId, allIds } = acc;
        return {
          ...acc,
          byId: {
            ...byId,
            [id]: {
              showEditNameListForm: false,
              showAddNewTaskFrom: false,
            },
          },
          allIds: [...allIds, id],
        };
      }, { byId: {}, allIds: [] });
      return { ...state, listsUIState: mappedLists };
    },

    /* createTasksUIState: (state, { payload: { tasks } }) => {
      const mappedTasks = tasks.reduce((acc, { id }) => {
        const { byId, allIds } = acc;
        return {
          ...acc,
          byId: { ...byId, [id]: { showEditNameTaskForm: false } },
          allIds: [...allIds, id],
        };
      }, { byId: {}, allIds: [] });
      return {
        ...state,
        tasksUIState: mappedTasks,
      };
    }, */

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
    showEditNameListForm: (state, { payload: { listId, showForm } }) => {
      const { listsUIState } = state;
      const list = listsUIState.byId[listId];
      list.showEditNameListForm = showForm;
      return state;
    },
    showAddNewTaskFrom: (state, { payload: { listId, showForm } }) => {
      const { listsUIState } = state;
      const list = listsUIState.byId[listId];
      list.showAddNewTaskFrom = showForm;
      return state;
    },
    showEditNameTaskFrom: (state, { payload: { taskId, showFrom } }) => {
      const { tasksUIState } = state;
      const task = tasksUIState.byId[taskId];
      task.showEditNameTaskForm = showFrom;
      return state;
    },
    addErrors: (state, { payload: { errors } }) => ({ ...state, errors }),
    setFetching: (state, { payload }) => ({ ...state, fetching: payload }),
  },
});

const currentBoardActions = slice.actions;
const currentBoard = slice.reducer;

const getCurrentBoard = (boardId, authToken) => async (dispatch) => {
  const url = routes.boardPathShow(boardId);

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { board } = res.data;

  dispatch(currentBoardActions.addBoard({ board }));
};

const connectToChannel = (channel) => async (dispatch) => {
  channel
    .here(([data]) => {
      const [board, members, lists, tasks] = data;
      dispatch(currentBoardActions.addBoard({ board }));
      dispatch(currentBoardActions.addMembers({ members }));
      dispatch(currentBoardActions.createListsUIState({ lists }));
      // dispatch(currentBoardActions.createTasksUIState({ tasks }));
      dispatch(currentBoardActions.addNewTasks({ tasks }));
      dispatch(currentBoardActions.addLists({ lists }));

      console.log(lists);
    })
    .joining((data) => {
      console.log(data);
    })
    .listen('AddUserOnBoard', (e) => {
      console.log(e);
    });
};

const addUserOnBoard = (data, authToken, channel) => async (dispatch) => {
  const url = routes.addUserOnBoardPath();

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

const createBoardList = (data, authToken, boardId) => async (dispatch) => {
  const url = routes.boardsListsPath(boardId);

  dispatch(currentBoardActions.setFetching(true));

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const { lists } = res.data;

    dispatch(currentBoardActions.createListsUIState({ lists }));
    dispatch(currentBoardActions.addLists({ lists }));
  } catch (e) {
    throw (e);
  }
};

const updateListName = (data, listId, boardId, authToken) => async (dispatch) => {
  dispatch(currentBoardActions.setFetching(true));
  const url = routes.boardsListsPatchPath(boardId, listId);

  const res = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { lists } = res.data;

  dispatch(currentBoardActions.addLists({ lists }));
};

const fetchDeleteList = (boardId, listId, authToken) => async (dispatch) => {
  const url = routes.boardsListsDeletePath(boardId, listId);

  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { lists } = res.data;

  dispatch(currentBoardActions.addLists({ lists }));
};

const getCurrentTasks = (listId, authToken) => async (dispatch) => {
  const url = routes.listTasksPath(listId);

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const { tasks } = res.data;
    console.log(tasks);
    dispatch(currentBoardActions.addNewTasks({ tasks }));
  } catch (e) {
    throw (e);
  }
};

const createListTask = (data, listId, authToken) => async (dispatch) => {
  const url = routes.listTasksPath(listId);

  try {
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const { tasks } = res.data;

    dispatch(currentBoardActions.addNewTasks({ tasks }));
  } catch (e) {
    throw (e);
  }
};

const updateTaskName = (data, listId, taskId, authToken) => async (dispatch) => {
  // dispatch(currentBoardActions.setFetching(true));
  const url = routes.listTaskPatchPath(listId, taskId);

  const res = await axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { tasks } = res.data;

  dispatch(currentBoardActions.addNewTasks({ tasks }));
};

const fetchDeleteTask = (listId, taskId, authToken) => async (dispatch) => {
  const url = routes.listTaskDeletePath(listId, taskId);

  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const { tasks } = res.data;

  dispatch(currentBoardActions.addNewTasks({ tasks }));
};

export {
  currentBoardActions,
  currentBoard,
  connectToChannel,
  addUserOnBoard,
  getCurrentBoard,
  createBoardList,
  updateListName,
  fetchDeleteList,
  createListTask,
  updateTaskName,
  fetchDeleteTask,
  getCurrentTasks,
};
