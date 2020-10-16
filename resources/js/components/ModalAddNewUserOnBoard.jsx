import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import {
  Button, Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';

import { actions } from '../slices/index';

const ModalAddNewUserOnBoard = ({
  dispatch, showModal, handleSubmit, errorsForm,
}) => {
  const validate = (values) => {
    // let errors = errorsForm;
    if (!values.email) {
      const errors = {};
      dispatch(actions.addErrors({ errors }));
      return errors;
    }
  };

  const f = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: handleSubmit,
  });

  const handleModal = () => {
    const errors = {};
    dispatch(actions.addErrors({ errors }));
    dispatch(actions.showAddNewUserModal(!showModal));
    f.resetForm();
  };

  return (
      <Modal size="sm" show={showModal} onHide={handleModal}>
          <Modal.Header closeButton>
              <Modal.Title id="add-new-board">Add new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={f.handleSubmit}>
                  <FormGroup>
                      <FormControl
                          name="email"
                          type="text"
                          placeholder="Add user email"
                          onChange={f.handleChange}
                          onBlur={f.handleBlur}
                          value={f.values.email}
                          disabled={f.isSubmitting}
                          isInvalid={!!errorsForm.email}
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                          {errorsForm.email ? errorsForm.email : null}
                      </Form.Control.Feedback>
                  </FormGroup>
                  <Button variant="primary" type="submit" disabled={errorsForm.email ? true : null}>
                      Add user
                  </Button>
                  or
                  <Button variant="link" onClick={handleModal}>
                      Cancel
                  </Button>
              </Form>
          </Modal.Body>
      </Modal>
  );
};

ModalAddNewUserOnBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorsForm: PropTypes.object.isRequired,
};

export default ModalAddNewUserOnBoard;
