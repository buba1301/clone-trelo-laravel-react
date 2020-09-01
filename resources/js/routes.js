const host = '';
const prefix = 'api';

export default {
  registrationPath: () => [host, prefix, 'registrations'].join('/'),
};
