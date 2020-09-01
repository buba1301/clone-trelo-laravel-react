import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getErrors } from '../utils';
import { asyncActions, actions } from '../slices/index';

const RegistrationsNew = () => {
  const errors = useSelector((state) => state.registration.errors);
  console.log(errors);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // setDocumentTitle('SingUp');
  });

  const handleSubmit = async (values, { resetForm, setStatus }) => {
    const { singUp } = asyncActions;
    const { registrationErrors } = actions;

    try {
      await dispatch(singUp(values));
    } catch (e) {
      console.log(e.response.data);

      const { data } = e.response;

      const a = JSON.parse(data);

      dispatch(registrationErrors(a)); // !!! додоелать вывод ошибок

      setStatus(getErrors(errors, 'email'));
    }
  };

  const f = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    onSubmit: handleSubmit,
  });

  return (
      <div className="view-container registration new">
          <main>
              <header>
                  <div className="logo" />
              </header>
              <Form onSubmit={f.handleSubmit}>
                  <FormGroup>
                      <FormControl
                          name="first_name"
                          type="text"
                          placeholder="First Name"
                          onChange={f.handleChange}
                          value={f.values.first_name}
                          isInvalid={!!f.status}
                          // disable={f.isSubmitting}
                      />
                      <FormControl.Feedback type="invalid">
                          {f.status}
                      </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup>
                      <FormControl
                          name="last_name"
                          type="text"
                          placeholder="Last Name"
                          onChange={f.handleChange}
                          value={f.values.last_name}
                          isInvalid={!!f.status}
                          // disable={f.isSubmitting}
                      />
                      <FormControl.Feedback type="invalid">
                          {f.status}
                      </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup>
                      <FormControl
                          name="email"
                          type="text"
                          placeholder="Email"
                          onChange={f.handleChange}
                          value={f.values.email}
                          isInvalid={!!f.status}
                          // disable={f.isSubmitting}
                      />
                      <FormControl.Feedback type="invalid">
                          {f.status}
                      </FormControl.Feedback>
                  </FormGroup>

                  <FormGroup>
                      <FormControl
                          name="password"
                          type="text"
                          placeholder="Password"
                          onChange={f.handleChange}
                          value={f.values.password}
                          isInvalid={!!f.status}
                          // disable={f.isSubmitting}
                      />
                      <FormControl.Feedback type="invalid"></FormControl.Feedback>
                  </FormGroup>

                  <FormGroup>
                      <FormControl
                          name="password_confirmation"
                          type="text"
                          placeholder="Confirm password"
                          onChange={f.handleChange}
                          value={f.values.password_confirmation}
                          isInvalid={!!f.status}
                          //  disable={f.isSubmitting}
                      />
                      <FormControl.Feedback type="invalid"></FormControl.Feedback>
                  </FormGroup>

                  <Button variant="primary" type="submit">
                      Sing Up
                  </Button>
              </Form>
              <Link to="/sign_in">Sign in</Link>
          </main>
      </div>
  );
};

export default RegistrationsNew;
