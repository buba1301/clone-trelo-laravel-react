/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Container, Row } from 'react-bootstrap';
import ReactGravatar from 'react-gravatar';
import { actions, asyncActions } from '../slices/index';

import AddNewList from './AddNewList.jsx';
import ListView from './ListView/ListView.jsx';

import echo from '../bootstrap';

const BoardMain = ({ boardId, authToken, history }) => {
  const showAddNewListFrom = useSelector(({ currentBoard }) => currentBoard.showAddNewListForm);
  const showDeleteModal = useSelector(({ boards }) => boards.showDeleteModal);
  const lists = useSelector(({ currentBoard }) => currentBoard.lists);
  const fetching = useSelector(({ currentBoard }) => currentBoard.fetching);

  const dispatch = useDispatch();

  return (
      <div className="container">
          <div className="row">
              {!isEmpty(lists)
                ? lists.map(({ name, id }) => (
                        <ListView
                            key={id}
                            listId={id}
                            name={name}
                            authToken={authToken}
                            dispatch={dispatch}
                            boardId={boardId}
                            fetching={fetching}
                            showDeleteModal={showDeleteModal}
                        />
                ))
                : null}
              <AddNewList
                  dispatch={dispatch}
                  showAddNewListForm={showAddNewListFrom}
                  boardId={boardId}
                  authToken={authToken}
                  history={history}
              />
          </div>
      </div>
  );
};

export default BoardMain;
