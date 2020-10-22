/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table } from 'evergreen-ui';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Footer from './Footer.jsx';

const ListView = ({
  name,
  listId,
  authToken,
  dispatch,
  boardId,
  fetching,
  showDeleteModal,
}) => {
  const showAddNewTaskFrom = useSelector(({ currentBoard }) => currentBoard.listsUIState.byId[listId].showAddNewTaskFrom);

  const showEditNameListForm = useSelector(({ currentBoard }) => currentBoard.listsUIState.byId[listId].showEditNameListForm);

  // eslint-disable-next-line camelcase
  const tasks = useSelector(({ currentBoard }) => currentBoard.tasks.filter(({ list_id }) => list_id === listId));
  console.log(tasks);

  return (
      <div className="col-lg-3 col-sm-12 col-md-6">
          <div className="card">
              <div className="card-header">
                  <Header
                      name={name}
                      dispatch={dispatch}
                      listId={listId}
                      boardId={boardId}
                      authToken={authToken}
                      showEditNameListForm={showEditNameListForm}
                      showDeleteModal={showDeleteModal}
                      fetching={fetching}
                  />
              </div>

              <div className="card-body">
                    {tasks.length !== 0
                      ? <Table>
                        <Table.Body height={200}>
                          {tasks.map((task) => (
                          <Body
                            key={task.id}
                            task={task}
                            listId={listId}
                            dispatch={dispatch}
                            authToken={authToken}
                            showDeleteModal={showDeleteModal}
                          />
                          ))}
                        </Table.Body>
                      </Table>
                      : null
                    }
              </div>
              <div className="card-footer">
                  <Footer
                      dispatch={dispatch}
                      listId={listId}
                      authToken={authToken}
                      showAddNewTaskFrom={showAddNewTaskFrom}
                  />
              </div>
          </div>
      </div>
  );
};

ListView.propTypes = {
  name: PropTypes.string.isRequired,
  listId: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  showDeleteModal: PropTypes.bool.isRequired,
};
export default ListView;
