/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';

import { actions, asyncActions } from '../slices';

const BoardsForm = ({
  dispatch, onClick, token,
}) => {
  const showForm = useSelector((state) => state.boards.showForm);

  const history = useHistory();

  const handleSubmit = (values) => {
    try {
      dispatch(asyncActions.createBoard(values, token, history));
      dispatch(actions.setShowForm(!showForm));
    } catch (e) {
      console.log(e.response);
    }
  };

  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
  });

  return (
      <Modal size="sm" show={showForm} onHide={onClick}>
          <Modal.Header closeButton>
              <Modal.Title id="add-new-board">Add new board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={f.handleSubmit}>
                  <FormGroup>
                      <FormControl
                          name="name"
                          type="text"
                          placeholder="Write board name"
                          onChange={f.handleChange}
                          value={f.values.name}
                          required
                      />
                  </FormGroup>
                  <Button
                      variant="primary"
                      type="submit"
                  >
                      Add board
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
  );
};

BoardsForm.prototypes = {
  dispatch: PropTypes.func,
  errors: PropTypes.object,
  showForm: PropTypes.bool,
  onClick: PropTypes.func,
  createBoard: PropTypes.func,
};

export default BoardsForm;
