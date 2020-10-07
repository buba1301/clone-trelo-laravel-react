import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container, Spinner, Navbar, Nav, Button,
} from 'react-bootstrap';
import ReactGravatar from 'react-gravatar';
import { actions, asyncActions } from '../slices/index';

import ModalAddNewUserOnBoard from './ModalAddNewUserOnBoard.jsx';
import echo from '../bootstrap';

const BoardShowView = () => {
  const board = useSelector(({ currentBoard }) => currentBoard.board);
  const members = useSelector(({ currentBoard }) => currentBoard.members);
  const showModal = useSelector(({ currentBoard }) => currentBoard.showAddNewUserModal);

  const { id } = useParams();

  const authToken = localStorage.getItem('laravelToken');

  const dispatch = useDispatch();

  const channel = echo.join(`board.${id}`);

  useEffect(() => {
    dispatch(asyncActions.connectToChannel(channel, authToken));
  }, [board]);

  if (!board) {
    return (
          <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
          </Spinner>
    );
  }

  const handleModal = async () => {
    await dispatch(actions.showAddNewUserModal(!showModal));
  };

  const handleSubmit = async ({ email }, { resetForm }) => {
    const data = { email, board_id: id };
    try {
      await dispatch(asyncActions.addUserOnBoard(data, authToken, channel));
    } catch (e) {
      console.log(e.response.data);
    }
    dispatch(actions.showAddNewUserModal(!showModal));
    resetForm();
  };

  const renderMembers = () => (
          <>
            {members.map(({ email, id }) => (
                    <ReactGravatar email={email} key={id}/>
            ))}
          </>
  );

  return (
      <Container>
          <Navbar>
              <Nav className="mr-auto">
                  <h3>{board.name}</h3>
              </Nav>
              {renderMembers()}
              <Button variant="outline-dark" onClick={handleModal}>
                  +
              </Button>
          </Navbar>
          <div>Test boards {id}</div>
          <ModalAddNewUserOnBoard
              showModal={showModal}
              handleModal={handleModal}
              handleSubmit={handleSubmit}
              channel={channel}
              members={members}
          />
      </Container>
  );
};

export default BoardShowView;
