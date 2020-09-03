import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  Form, FormGroup, FormControl, FormLabel, Button,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { setDocumentTitle } from '../utils';
import { asyncActions, actions } from '../slices/index';

const SessionNew = () => {
  const errors = useSelector((state) => state.session.errors);
  console.log(errors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setDocumentTitle('SignIn');
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { signIn } = asyncActions;
    const { loginErrors } = actions;

    try {
      await dispatch(signIn(values));
      resetForm();
      history.push('/');
    } catch (e) {
      const { data } = e.response;

      dispatch(loginErrors(data));
    }
  };

  const f = useFormik({
    initialValues: {
      email: '',
      password: '',
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
                      <FormLabel>Email</FormLabel>
                      <FormControl
                          name="email"
                          type="text"
                          placeholder="Email"
                          onChange={f.handleChange}
                          value={f.values.email}
                          required
                      // disable={f.isSubmitting}
                      />
                  </FormGroup>

                  <FormGroup>
                      <FormLabel>Password</FormLabel>
                      <FormControl
                          name="password"
                          type="text"
                          placeholder="Password"
                          onChange={f.handleChange}
                          value={f.values.password}
                          isInvalid={!!errors.userNotFound}
                          required
                      // disable={f.isSubmitting}
                      />
                      <Form.Control.Feedback type="invalid">
                          {_.has(errors, 'userNotFound') && errors.userNotFound}
                      </Form.Control.Feedback>
                  </FormGroup>

                  <Button variant="primary" type="submit">
                      Sign In  // add spinet slow loading
                  </Button>
              </Form>
              <Link to="/sign_up">Sign up</Link>
          </main>
      </div>
  );
};

export default SessionNew;
