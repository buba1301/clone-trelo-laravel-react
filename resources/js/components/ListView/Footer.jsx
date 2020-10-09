/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Form, FormControl, FormGroup, Row, Col, Container, Dropdown, ButtonGroup, DropdownButton,
} from 'react-bootstrap';
import { actions, asyncActions } from '../../slices/index';

const Footer = ({ dispatch, id, showAddNewTaskFrom }) => {
  console.log(typeof id);

  const handleOpenForm = () => {
    dispatch(actions.showAddNewTaskFrom({ id, showForm: !showAddNewTaskFrom }));
  };

  if (!showAddNewTaskFrom) {
    return (
        <div className="coll">
                <Button onClick={handleOpenForm} block>
                    + Add new task
                </Button>
            </div>
    );
  }

  return (
      <div className="coll">
            <Form>
                <FormGroup>
                    <FormControl
                        name="name"
                        type="text"
                        placeholder="Add new task"
                        // onChange={f.handleChange}
                        // onBlur={f.handleBlur}
                        // value={f.values.name}
                        // disabled={f.isSubmitting}
                        // isInvalid={!!f.errors.email}
                        required
                    />
                    <FormControl.Feedback>

                    </FormControl.Feedback>
                </FormGroup>
                <Button variant="primary" type="submit">Add new task</Button>
                <Button variant="link" onClick={handleOpenForm}>Cancel</Button>
            </Form>
        </div>
  );
};

export default Footer;
