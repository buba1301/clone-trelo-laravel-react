import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { actions, asyncActions } from '../slices/index';

const BoardShowView = () => {
  const { id } = useParams();
  const authToken = localStorage.getItem('laravelToken');
  // const board = useSelector((state) => state.currentBoard.board);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActions.connectToChannel(id, authToken));
  }, []);

  return (
      <div>
          <div>Test boards {id}</div>
      </div>
  );
};

export default BoardShowView;
