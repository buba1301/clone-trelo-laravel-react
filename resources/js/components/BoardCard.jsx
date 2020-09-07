import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

// import { getErrors, setDocumentTitle } from '../utils';
import { actions, asyncActions } from '../slices/index';

const BoardCard = ({
  dispatch, name, id, token,
}) => {
  const handleDeleteBoard = async () => {
    try {
      await dispatch(asyncActions.fetchDeleteBoard(id, token));
    } catch (e) {
      const { data } = e.responce;
      dispatch(actions.boardsErrors(data));
    }
  };

  return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text></Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Button variant="link" onClick={handleDeleteBoard}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
  );
};
// добавить удаление доски
BoardCard.proptypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string,
  key: PropTypes.number,
  token: PropTypes.string,
};

export default BoardCard;
