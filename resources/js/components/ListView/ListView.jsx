/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Form, FormControl, FormGroup, Row, Col, Container, Dropdown, ButtonGroup, DropdownButton,
} from 'react-bootstrap';

import Header from './Header.jsx';
import Body from './Body.jsx';
import Footer from './Footer.jsx';

import { actions, asyncActions } from '../../slices/index';

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
                  <ul className="list-group list-group-flush">
                      {tasks.length !== 0
                        ? tasks.map((task) => (
                                <Body
                                    key={task.id}
                                    task={task}
                                    listId={listId}
                                    dispatch={dispatch}
                                    authToken={authToken}
                                    showDeleteModal={showDeleteModal}
                                />
                        ))
                        : null}
                  </ul>
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
export default ListView;
