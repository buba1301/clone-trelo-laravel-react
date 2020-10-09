/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Form, FormControl, FormGroup, Row, Col, Container, Dropdown, ButtonGroup, DropdownButton,
} from 'react-bootstrap';

import Header from './Heared.jsx';
import Body from './Body.jsx';
import Footer from './Footer.jsx';

import { actions, asyncActions } from '../../slices/index';

const ListView = ({ name, id, dispatch }) => {
  const showAddNewTaskFrom = useSelector(({ currentBoard }) => (currentBoard.tasksUIState.byId[id].showAddNewTaskFrom));

  const showEditNameListForm = useSelector(({ currentBoard }) => (currentBoard.listsUIState.byId[id].showEditNameListForm));

  return (
    <div className="col-lg-3 col-sm-12 col-md-6">
        <div className="card">
            <div className="card-header">
                <Header
                    name={name}
                    dispatch={dispatch}
                    id={id}
                    showEditNameListForm={showEditNameListForm}
                />
            </div>

            <div className="card-body">
                <Body />
            </div>
            <div className="card-footer">
                <Footer
                    dispatch={dispatch}
                    id={id}
                    showAddNewTaskFrom={showAddNewTaskFrom}
                />
            </div>
        </div>
    </div>
  );
};

export default ListView;
