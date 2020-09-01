import _ from 'lodash';

export const getErrors = (errors, nameError) => {
  if (!(_.has(errors, nameError))) {
    return null;
  }

  return errors.nameError.join();
};
