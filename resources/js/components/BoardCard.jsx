import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { actions, asyncActions } from '../slices/index';

import ModalDelete from './ModalDelete.jsx';

const BoardCard = ({
  dispatch, name, id, token,
}) => {
  const showDeleteModal = useSelector((state) => state.boards.showDeleteModal);

  const history = useHistory();

  const handleClose = () => dispatch(actions.showDeleteModal(!showDeleteModal));
  const handleOpen = () => dispatch(actions.showDeleteModal(!showDeleteModal));
  const handleOpenBoard = () => history.push(`/boards/${id}`);

  const handleDeleteBoard = async () => {
    try {
      await dispatch(asyncActions.fetchDeleteBoard(id, token));
      dispatch(actions.showDeleteModal(!showDeleteModal));
    } catch (e) {
      const { data } = e.response;
      dispatch(actions.boardsErrors(data));
    }
  };

  return (
      <>
          <Card bg="dark" text="white">
              <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text></Card.Text>
                  <Button variant="link" onClick={handleOpenBoard}>
                      Show board
                  </Button>
                  <Button variant="link" onClick={handleOpen}>
                      Delete
                  </Button>
              </Card.Body>
          </Card>
          <ModalDelete
              showDeleteModal={showDeleteModal}
              handleClose={handleClose}
              handleDelete={handleDeleteBoard}
              type={'board'}
          />
      </>
  );
};

BoardCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default BoardCard;
