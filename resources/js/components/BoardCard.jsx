import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

// import { getErrors, setDocumentTitle } from '../utils';
// import { asyncActions } from '../slices/index';

const BoardCard = ({ dispatch, name }) => (
    <Card>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text></Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
    </Card>
);

BoardCard.proptypes = {
  dispatch: PropTypes.func,
  name: PropTypes.string,
  key: PropTypes.number,
};

export default BoardCard;
