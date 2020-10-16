/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import AddNewList from './AddNewList.jsx';
import ListView from './ListView/ListView.jsx';

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

BoardMain.propTypes = {
  boardId: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default BoardMain;
