import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button, Form, FormControl, FormGroup, Row, Col, Container,
} from 'react-bootstrap';

import { actions, asyncActions } from '../slices/index';

const AddNewList = ({ dispatch, showAddNewListForm }) => {
  const handleOpenForm = () => dispatch(actions.showAddNewListForm(!showAddNewListForm));

  const handleSubmit = (values, { resetForm, setStatus }) => {
    // здесь добавляем название списка и загружаем в базу данных, после чего отрисовывается список с названием и формой добавления задачи
  };

  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
  });

  if (!showAddNewListForm) {
    return (
        <div className="col-lg-3 col-sm-12 col-md-6">
            <Button onClick={handleOpenForm} block>
                + Add new list
            </Button>
        </div>
    );
  }

  return (
        <div className="col-lg-3 col-sm-12 col-md-6">
                    <Form>
                        <FormGroup>
                            <FormControl
                              name="name"
                              type="text"
                              placeholder="Add new list"
                              onChange={f.handleChange}
                              onBlur={f.handleBlur}
                              value={f.values.name}
                              // disabled={f.isSubmitting}
                              // isInvalid={!!f.errors.email}
                              required
                            />
                            <FormControl.Feedback>

                            </FormControl.Feedback>
                        </FormGroup>
                        <Button variant="primary" type="submit" block>Add new list</Button>
                        <Button variant="link" block onClick={handleOpenForm}>
                            Cancel
                        </Button>
                    </Form>
                </div>
  );
};

export default AddNewList;
