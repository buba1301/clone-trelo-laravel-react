/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Row, Col, Button, Spinner,
} from 'react-bootstrap';

import BoardCard from './BoardCard.jsx';
import BoardForm from './BoardForm.jsx';

import { setDocumentTitle } from '../utils';
import { actions, asyncActions } from '../slices/index';

const renderBoards = (boards, dispatch, authToken) => (
      <Row xs={1} md={2} lg={4}>
          {boards.map((board) => (
              <Col key={board.id}>
                  <BoardCard
                      dispatch={dispatch}
                      token={authToken}
                      {...board}
                  />
              </Col>
          ))}
      </Row>
);

const renderAddNewBoard = (showForm, onClick, dispatch, errors, authToken) => {
  if (!showForm) {
    return (
        <Button variant="link" onClick={onClick}>
            Add new board...
        </Button>
    );
  }
  return (
        <BoardForm
            dispatch={dispatch}
            errors={errors}
            onClick={onClick}
            token={authToken}
        />
  );
};

const Main = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  const boards = useSelector((state) => state.boards.boards);
  const fetching = useSelector((state) => state.boards.fetching);
  const errors = useSelector((state) => state.boards.errors);
  const showForm = useSelector((state) => state.boards.showForm);

  const dispatch = useDispatch();

  const authToken = localStorage.getItem('laravelToken');// maybe add in context

  useEffect(() => {
    setDocumentTitle('Boards');
    const fetchBoards = async () => {
      try {
        await dispatch(asyncActions.boardsFetching(authToken));
      } catch (e) {
        const { data } = e.response;
        dispatch(actions.boardsErrors(data));
      }
    };
    fetchBoards();
  }, [currentUser.id]);

  const handleShowForm = () => {
    dispatch(actions.setShowForm(!showForm));
  };

  if (fetching) {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
  }

  return (
      <Container>
          <header>
              <h1>My boards</h1>
          </header>
          {renderAddNewBoard(showForm, handleShowForm, dispatch, errors, authToken)}
          {renderBoards(boards, dispatch, authToken)}
      </Container>
  );
};

export default Main;
