/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  Button, Form, FormControl, FormGroup,
} from 'react-bootstrap';
import { actions, asyncActions } from '../../slices/index';

const Footer = ({
  dispatch, listId, showAddNewTaskFrom, authToken,
}) => {
  const handleOpenCloseForm = () => {
    dispatch(actions.showAddNewTaskFrom({ listId, showForm: !showAddNewTaskFrom }));
  };

  const handleSubmit = (values, { resetForm }) => {
    try {
      dispatch(asyncActions.createListTask(values, listId, authToken));
      dispatch(actions.showAddNewTaskFrom({ listId, showForm: !showAddNewTaskFrom }));
      resetForm();
    } catch (e) {
      console.log(e);
    }
  };

  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
  });

  if (!showAddNewTaskFrom) {
    return (
        <div className="coll">
            <Button block onClick={handleOpenCloseForm}>
                + Add new task
            </Button>
        </div>
    );
  }

  return (
      <div className="coll">
          <Form onSubmit={f.handleSubmit}>
              <FormGroup>
                  <FormControl
                      name="name"
                      type="text"
                      placeholder="Add new task"
                      onChange={f.handleChange}
                      onBlur={f.handleBlur}
                      value={f.values.name}
                      // disabled={f.isSubmitting}
                      // isInvalid={!!f.errors.email}
                      required
                  />
                  <FormControl.Feedback></FormControl.Feedback>
              </FormGroup>
              <Button variant="dark" type="submit">
                  Add new task
              </Button>
              <Button variant="link" onClick={handleOpenCloseForm}>
                  Cancel
              </Button>
          </Form>
      </div>
  );
};

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  showAddNewTaskFrom: PropTypes.bool.isRequired,
  authToken: PropTypes.string.isRequired,
};

export default Footer;
