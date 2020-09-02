export const setDocumentTitle = (title) => document.title = `${title} | Clone Trello`;

export const getErrors = (errors, nameError) => {
  console.log(errors[nameError].join(''));
  return errors[nameError].join(''); // подумать как разделить если массив состоит из нескольких ошибок
};
