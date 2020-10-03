/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Container, Row, Col, Button, Spinner,
} from 'react-bootstrap';

import BoardCard from './BoardCard.jsx';
import BoardForm from './BoardForm.jsx';

import { getErrors, setDocumentTitle } from '../utils';
import { actions, asyncActions } from '../slices/index';

const Main = () => {
  const currentUserId = useSelector((state) => state.session.currentUser.id);
  const boards = useSelector((state) => state.boards.boards);
  const fetching = useSelector((state) => state.boards.fetching);
  const errors = useSelector((state) => state.boards.errors);
  const showForm = useSelector((state) => state.boards.showForm);

  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = localStorage.getItem('laravelToken');// maybe add in context

  useEffect(() => {
    setDocumentTitle('Boards');

    const fetchBoards = async () => {
      try {
        await dispatch(asyncActions.boardsFetching(authToken));
      } catch (e) {
        // throw (e);
        const { data } = e.response;
        console.log(data);
        dispatch(actions.boardsErrors(data));
      }
    };
    fetchBoards();
  }, [currentUserId]);

  const handleShowForm = () => {
    dispatch(actions.setShowForm(!showForm));
  };

  const renderBoards = () => (
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

  const renderAddNewBoard = () => {
    if (!showForm) {
      return (
        <Button variant="link" onClick={handleShowForm}>
            Add new board...
        </Button>
      );
    }
    return (
        <BoardForm
            dispatch={dispatch}
            errors={errors}
            onClick={handleShowForm}
            token={authToken}
        />
    );
  };

  if (fetching) {
    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    ); // добавить индикатор загрузки и на кнопках тоже
  }

  return (
        <Container>
          <header>
              <h3>My boards</h3>
          </header>
          {renderAddNewBoard()}
          {renderBoards()}
        </Container>
  );
};

Main.proptypes = {
  token: PropTypes.string,
  id: PropTypes.string,
};

export default Main;

/*
if (!showDeleteModal) {
      return (
              <ModalDelete
                  key={board.id}
                  showDeleteModal={showDeleteModal}
                  handleClose={handleClose}
                  handleDeleteBoard={handleDeleteBoard(board.id, authToken)}
              />
      );
    } */
