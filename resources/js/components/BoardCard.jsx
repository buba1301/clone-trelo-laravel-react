/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

// import { getErrors, setDocumentTitle } from '../utils';
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
      const { data } = e.responce;
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
              handleDeleteBoard={handleDeleteBoard}
          />
      </>
  );
};

BoardCard.proptypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  key: PropTypes.number,
  token: PropTypes.string,
};

export default BoardCard;
