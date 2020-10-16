const host = '';
const prefix = 'api';

export default {
  registrationPath: () => [host, prefix, 'registrations'].join('/'),

  loginPath: () => [host, prefix, 'login'].join('/'),

  userPath: () => [host, prefix, 'user'].join('/'),
  userDeleteSessionPath: () => [host, prefix, 'user'].join('/'),

  boardsPath: () => [host, prefix, 'boards'].join('/'),
  boardPathShow: (boardId) => [host, prefix, 'boards', boardId].join('/'),
  boardsPathDelete: (boardId) => [host, prefix, 'boards', boardId].join('/'),

  addUserOnBoardPath: (boardId) => [host, prefix, 'boards', boardId, 'users'].join('/'),

  boardsListsPath: (boardId) => [host, prefix, 'boards', boardId, 'lists'].join('/'),
  boardsListsPatchPath: (boardId, listId) => [host, prefix, 'boards', boardId, 'lists', listId].join('/'),
  boardsListsDeletePath: (boardId, listId) => [host, prefix, 'boards', boardId, 'lists', listId].join('/'),

  listTasksPath: (listId) => [host, prefix, 'lists', listId, 'tasks'].join('/'),
  listTaskPatchPath: (listId, taskId) => [host, prefix, 'lists', listId, 'tasks', taskId].join('/'),
  listTaskDeletePath: (listId, taskId) => [host, prefix, 'lists', listId, 'tasks', taskId].join('/'),
};
