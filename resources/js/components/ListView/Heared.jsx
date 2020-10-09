import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button, Form, FormControl, FormGroup, Row, Col, Container, Dropdown, ButtonGroup, DropdownButton,
} from 'react-bootstrap';
import { actions, asyncActions } from '../../slices/index';

const Header = ({
  dispatch, name, id, showEditNameListForm,
}) => {
  const handleOpenEdit = () => {
    dispatch(actions.showEditNameListForm({ id, showForm: !showEditNameListForm }));
  };

  const handleSubmit = () => {

  };

  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: handleSubmit,
  });

  if (showEditNameListForm) {
    return (
        <Form onSubmit={f.handleSubmit}>
            <FormGroup>
                <FormControl
                    name="name"
                    type="text"
                    placeholder="Add user email"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.name}
                    disabled={f.isSubmitting}
                    // isInvalid={!!f.errors.email}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {f.errors.name ? f.errors.name : null}
                </Form.Control.Feedback>
            </FormGroup>
            <Button variant="primary" type="submit" disabled={f.errors.name}>
                Edit name
                  </Button>
                  or
            <Button variant="link" onClick={handleOpenEdit}>
                Cancel
            </Button>
        </Form>
    );
  }

  return (
    <div className= "navbar navbar-light bg-light">
          <div>Navbar</div>
          <ul className="nav nav-pills">
              <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></a>
                  <div className="dropdown-menu">
                      <button className="btn btn-link dropdown-item" href="#" onClick={handleOpenEdit}>Edit list</button>
                      <div role="separator" className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#three">Delete list</a>
                  </div>
              </li>
          </ul>
    </div>
  );
};

export default Header;

/* <DropdownButton id="dropdown-basic-button" title="Name list">
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</DropdownButton> */
