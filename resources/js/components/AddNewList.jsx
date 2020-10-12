import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button, Form, FormControl, FormGroup, Card,
} from 'react-bootstrap';

import { actions, asyncActions } from '../slices/index';
import routes from '../routes';

const AddNewList = ({
  dispatch, showAddNewListForm, boardId, authToken,
}) => {
  const handleOpenForm = () => dispatch(actions.showAddNewListForm(!showAddNewListForm));

  const url = routes.boardsListsPath(boardId);
  console.log(url);

  const handleSubmit = (values, { resetForm }) => {
    try {
      dispatch(asyncActions.createBoardList(values, authToken, boardId));
      dispatch(actions.showAddNewListForm(!showAddNewListForm));
      dispatch(actions.setFetching(false));
      resetForm();
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

  if (!showAddNewListForm) {
    return (
        <div className="col-lg-3 col-sm-12 col-md-6">
            <div className="card">
                <div className="card-header">
                    <Button variant="dark" onClick={handleOpenForm} block>
                        + Add new list
                    </Button>
                </div>
            </div>
        </div>
    );
  }

  return (
      <div className="col-lg-3 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-header">
              <Form onSubmit={f.handleSubmit}>
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
                      <FormControl.Feedback></FormControl.Feedback>
                  </FormGroup>
                  <Button variant="dark" type="submit" block>
                      Add new list
                  </Button>
                  <Button variant="link" block onClick={handleOpenForm}>
                      Cancel
                  </Button>
              </Form>
            </div>
          </div>
      </div>
  );
};

export default AddNewList;
