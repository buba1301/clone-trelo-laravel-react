import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import {
  Button, Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';

const ModalAddNewUserOnBoard = ({
  showModal, handleModal, handleSubmit, channel, members,
}) => {
  const validate = (values) => {
    const errors = {};

    const filtredMembers = members.filter(({ email }) => email === values.email);
    console.log(filtredMembers);

    if (filtredMembers.length > 0) {
      errors.email = 'User was added';
    }

    return errors;
  };

  const f = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: handleSubmit,
  });
  // добавить валидацию отсутсвия пользователя в БД
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
                          isInvalid={!!f.errors.email}
                          required
                      />
                      <Form.Control.Feedback type="invalid">
                          {f.errors.email ? f.errors.email : null}
                      </Form.Control.Feedback>
                  </FormGroup>
                  <Button variant="primary" type="submit" disabled={f.errors.email}>
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

export default ModalAddNewUserOnBoard;
