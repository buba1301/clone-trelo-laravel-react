import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container, Spinner, Navbar, Nav, Button,
} from 'react-bootstrap';
import ReactGravatar from 'react-gravatar';
import { actions, asyncActions } from '../slices/index';

import ModalAddNewUserOnBoard from './ModalAddNewUserOnBoard.jsx';
import BoardMain from './BoardMain.jsx';
import echo from '../bootstrap';

const BoardShowView = () => {
  const board = useSelector(({ currentBoard }) => currentBoard.board);
  const members = useSelector(({ currentBoard }) => currentBoard.members);
  const showModal = useSelector(({ currentBoard }) => currentBoard.showAddNewUserModal);
  const errorsForm = useSelector(({ currentBoard }) => currentBoard.errors);

  const { id } = useParams();

  const authToken = localStorage.getItem('laravelToken');

  const dispatch = useDispatch();

  const channel = echo.join(`board.${id}`);

  useEffect(() => {
    dispatch(asyncActions.connectToChannel(channel, authToken));
  }, [board]);

  const handleModal = () => {
    dispatch(actions.showAddNewUserModal(!showModal));
  };

  const handleSubmit = async ({ email }, { resetForm }) => {
    const data = { email, board_id: id };
    try {
      await dispatch(asyncActions.addUserOnBoard(data, authToken, channel));
      dispatch(actions.showAddNewUserModal(!showModal));
      resetForm();
    } catch (e) {
      console.log(e.response.data);
      const errors = e.response.data;
      dispatch(actions.addErrors({ errors }));
      // return;
    }
  };

  const renderMembers = () => (
          <>
            {members.map(({ email, id }) => (
                    <ReactGravatar email={email} key={id}/>
            ))}
          </>
  );

  if (!board) {
    return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
    );
  }

  return (
      <Container>
          <Navbar bg="primary" variant="dark">
              <Nav className="mr-auto">
                  <h3>{board.name}</h3>
              </Nav>
              {renderMembers()}
              <Button variant="outline-dark" onClick={handleModal}>
                  +
              </Button>
          </Navbar>
          <BoardMain />
          <ModalAddNewUserOnBoard
              dispatch={dispatch}
              showModal={showModal}
              handleSubmit={handleSubmit}
              channel={channel}
              members={members}
              errorsForm={errorsForm}
          />
      </Container>
  );
};

export default BoardShowView;
