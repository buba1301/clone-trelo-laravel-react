const host = '';
const prefix = 'api';

export default {
  registrationPath: () => [host, prefix, 'registrations'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  userPath: () => [host, prefix, 'user'].join('/'),
  userDeleteSessionPath: () => [host, prefix, 'user'].join('/'),
  boardsPath: () => [host, prefix, 'boards'].join('/'),
};
