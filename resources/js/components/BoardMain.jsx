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

const BoardMain = () => {
  const showAddNewListFrom = useSelector(({ currentBoard }) => currentBoard.showAddNewListForm);
  // const lists = [];

  const lists = {
    byId: {
      1: { name: 'BlaBla', id: 1 }, 2: { name: 'BlaBla', id: 2 }, 3: { name: 'BlaBla', id: 3 }, 4: { name: 'BlaBla', id: 4 }, 5: { name: 'BlaBla', id: 5 },
    },
    allIds: [1, 2, 3, 4, 5],
  };

  const listsUIState = {
    byId: {
      1: { showEditNameListForm: false }, 2: { showEditNameListForm: false }, 3: { showEditNameListForm: false }, 4: { showEditNameListForm: false }, 5: { showEditNameListForm: false },
    },
    allIds: [1, 2, 3, 4, 5],
  };

  const mapped = lists.allIds.map((id) => lists.byId[id]);

  const tasks = { byId: { 1: { name: 'BlaBla', id: 1, showAddNewTaskFrom: false }, 2: { name: 'BlaBla', id: 2, showAddNewTaskFrom: false } }, allIds: [1, 2] };

  const tasksUIState = {
    byId: {
      1: { showAddNewTaskFrom: false }, 2: { showAddNewTaskFrom: false }, 3: { showAddNewTaskFrom: false }, 4: { showAddNewTaskFrom: false }, 5: { showAddNewTaskFrom: false },
    },
    allIds: [1, 2, 3, 4, 5],
  };

  const dispatch = useDispatch();

  dispatch(actions.addNewList({ lists }));
  dispatch(actions.addNewTasks({ tasks }));
  dispatch(actions.addNewTaskUIState({ tasksUIState }));
  dispatch(actions.addNewListsUIState(listsUIState));

  return (
      <div className="container">
          <div className="row">
            {(!isEmpty(mapped))
              ? mapped.map(({ name, id }) => (
                <ListView
                  key={id}
                  id={id}
                  name={name}
                  dispatch={dispatch}
                />))
              : null}
                <AddNewList
                    dispatch={dispatch}
                    showAddNewListForm={showAddNewListFrom}
                />
          </div>
      </div>
  );
};

export default BoardMain;
