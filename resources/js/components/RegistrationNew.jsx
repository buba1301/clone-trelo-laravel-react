import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  Container, Row, Col, Form, FormGroup, FormControl, FormLabel, Button, Navbar,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { getErrors, setDocumentTitle } from '../utils';

import { asyncActions, actions } from '../slices/index';

const RegistrationsNew = () => {
  const errors = useSelector((state) => state.registration.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setDocumentTitle('SignUp');
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { singUp } = asyncActions;
    const { registrationErrors } = actions;

    try {
      await dispatch(singUp(values));
      resetForm();
      history.push('/');
    } catch (e) {
      const { data } = e.response;

      dispatch(registrationErrors(JSON.parse(data)));
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
      <Container>
          <Row className="justify-content-md-center">
              <Col md="auto">
                  <Navbar>
                      <Navbar.Brand className="logo" />
                  </Navbar>
                  <Form onSubmit={f.handleSubmit}>
                      <FormGroup>
                          <FormLabel>First Name</FormLabel>
                          <FormControl
                              name="first_name"
                              type="text"
                              placeholder="First Name"
                              onChange={f.handleChange}
                              value={f.values.first_name}
                              isInvalid={!!errors.first_name}
                              required
                              // disable={f.isSubmitting}
                          />
                          <FormControl.Feedback type="invalid">
                              {_.has(errors, 'first_name')
                                  && getErrors(errors, 'first_name')}
                          </FormControl.Feedback>
                      </FormGroup>

                      <FormGroup>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl
                              name="last_name"
                              type="text"
                              placeholder="Last Name"
                              onChange={f.handleChange}
                              value={f.values.last_name}
                              isInvalid={!!errors.last_name}
                              required
                              // disable={f.isSubmitting}
                          />
                          <FormControl.Feedback type="invalid">
                              {_.has(errors, 'last_name')
                                  && getErrors(errors, 'last_name')}
                          </FormControl.Feedback>
                      </FormGroup>

                      <FormGroup>
                          <FormLabel>Email</FormLabel>
                          <FormControl
                              name="email"
                              type="text"
                              placeholder="Email"
                              onChange={f.handleChange}
                              value={f.values.email}
                              isInvalid={!!errors.email}
                              required
                              // disable={f.isSubmitting}
                          />

                          <Form.Control.Feedback type="invalid">
                              {_.has(errors, 'email')
                                  && getErrors(errors, 'email')}
                          </Form.Control.Feedback>
                      </FormGroup>

                      <FormGroup>
                          <FormLabel>Password</FormLabel>
                          <FormControl
                              name="password"
                              type="text"
                              placeholder="Password"
                              onChange={f.handleChange}
                              value={f.values.password}
                              isInvalid={!!errors.password}
                              required
                              // disable={f.isSubmitting}
                          />
                          <Form.Control.Feedback type="invalid">
                              {_.has(errors, 'password')
                                  && getErrors(errors, 'password')}
                          </Form.Control.Feedback>
                      </FormGroup>

                      <FormGroup>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl
                              name="password_confirmation"
                              type="text"
                              placeholder="Confirm password"
                              onChange={f.handleChange}
                              value={f.values.password_confirmation}
                              isInvalid={!!errors.password}
                              required
                              //  disable={f.isSubmitting}
                          />
                      </FormGroup>

                      <Button variant="primary" type="submit" size="lg" block>
                          Sign Up
                      </Button>
                      <Button variant="link" size="lg" block>
                          <Link to="/sign_in">Sign in</Link>
                      </Button>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
};

export default RegistrationsNew;
