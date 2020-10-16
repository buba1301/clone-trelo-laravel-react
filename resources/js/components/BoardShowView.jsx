import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Container, Spinner, Navbar, Nav, Button,
} from 'react-bootstrap';
import ReactGravatar from 'react-gravatar';
import { actions, asyncActions } from '../slices/index';

import ModalAddNewUserOnBoard from './ModalAddNewUserOnBoard.jsx';
import BoardMain from './BoardMain.jsx';
import echo from '../bootstrap';

const renderMembers = (members) => (
    <>
      {members.map(({ email, id }) => (
        <ReactGravatar email={email} key={id}/>
      ))}
    </>
);

const BoardShowView = () => {
  const currentUserId = useSelector((state) => state.session.currentUser.id);
  const board = useSelector(({ currentBoard }) => currentBoard.board);
  const members = useSelector(({ currentBoard }) => currentBoard.members);
  const showModal = useSelector(({ currentBoard }) => currentBoard.showAddNewUserModal);
  const errorsForm = useSelector(({ currentBoard }) => currentBoard.errors);

  const { id } = useParams();

  const authToken = localStorage.getItem('laravelToken');

  const dispatch = useDispatch();

  const history = useHistory();

  const channel = echo.join(`board.${id}`);

  useEffect(() => {
    dispatch(asyncActions.connectToChannel(channel, authToken));
  }, [currentUserId, board, members]);

  const handleModal = () => {
    dispatch(actions.showAddNewUserModal(!showModal));
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(asyncActions.addUserOnBoard(values, authToken, id));
      dispatch(actions.showAddNewUserModal(!showModal));
      resetForm();
    } catch (e) {
      console.log(e.response.data);
      const errors = e.response.data;
      dispatch(actions.addErrors({ errors }));
    }
  };

  if (!board) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
      <Container>
          <Container>
              <Navbar bg="primary" variant="dark">
                  <Nav className="mr-auto">
                      <h3>{board.name}</h3>
                  </Nav>
                  {renderMembers(members)}
                  <Button variant="outline-dark" onClick={handleModal}>
                      +
                  </Button>
              </Navbar>
          </Container>
          <BoardMain boardId={id} authToken={authToken} history={history} />
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
