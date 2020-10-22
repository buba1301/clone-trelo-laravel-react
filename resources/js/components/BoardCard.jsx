import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import { actions, asyncActions } from '../slices/index';
import modalDeleteConfig from '../config/modalDeleteType';

import ModalDelete from './ModalDelete.jsx';

const BoardCard = ({
  dispatch, name, id, token,
}) => {
  const showDeleteModal = useSelector((state) => state.deleteModal.showModal);
  const deleteId = useSelector((state) => state.deleteModal.id);
  const deleteType = useSelector((state) => state.deleteModal.type);

  const modalDeleteType = modalDeleteConfig.board;

  const history = useHistory();

  const handleCloseDeleteModal = () => dispatch(actions.hideDeleteModal());
  const handleOpenDeleteModal = () => dispatch(actions.showDeleteModal({
    type: modalDeleteType, id, showModal: true,
  }));
  const handleOpenBoard = () => history.push(`/boards/${id}`);

  const handleDeleteBoard = async () => {
    try {
      await dispatch(asyncActions.fetchDeleteBoard(deleteId, token));
      dispatch(actions.hideDeleteModal());
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
                  <Button variant="link" onClick={handleOpenDeleteModal}>
                      Delete
                  </Button>
              </Card.Body>
          </Card>
          <ModalDelete
              showDelete={showDeleteModal}
              handleClose={handleCloseDeleteModal}
              handleDelete={handleDeleteBoard}
              type={deleteType}
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
