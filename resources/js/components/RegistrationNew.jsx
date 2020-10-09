/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Container, Row, Col, Form, FormGroup, FormControl, FormLabel, Button, Navbar, Spinner,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { getErrors, setDocumentTitle } from '../utils';

import { asyncActions, actions } from '../slices/index';

const RegistrationsNew = () => {
  const errors = useSelector(({ registration }) => registration.errors);
  const disableSubmitButton = useSelector(({ registration }) => registration.regUIState.disableSubmitButton);
  const fetching = useSelector(({ registration }) => registration.fetching);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setDocumentTitle('SignUp');
  });

  const handleClick = () => {
    const errorsUpdate = {};
    dispatch(actions.registrationErrors(errorsUpdate));
    dispatch(actions.setSubmitButton(false));
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(asyncActions.singUp(values));
      dispatch(actions.setFetching(false));
      resetForm();
      history.push('/');
    } catch (e) {
      const { data } = e.response;
      dispatch(actions.setFetching(false));
      dispatch(actions.registrationErrors(JSON.parse(data)));
      dispatch(actions.setSubmitButton(true));
    }
  };

  const validate = ({ email, password }) => {
    if (!email || !password) {
      const errorsUpdate = {};
      dispatch(actions.registrationErrors(errorsUpdate));
      dispatch(actions.setSubmitButton(false));
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
    validate,
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
                          />
                          <FormControl.Feedback type="invalid">
                              {errors.first_name ? getErrors(errors, 'first_name') : null}
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
                          />
                          <FormControl.Feedback type="invalid">
                              {errors.last_name ? getErrors(errors, 'last_name') : null}
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
                          />

                          <Form.Control.Feedback type="invalid">
                              {errors.email ? getErrors(errors, 'email') : null}
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
                          />
                          <Form.Control.Feedback type="invalid">
                              {errors.password ? getErrors(errors, 'password') : null}
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

                      {fetching
                        ? <Button variant="primary" block disabled>
                              <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                              />
                              Loading...
                            </Button>
                        : <Button variant="primary" type="submit" size="lg" block disabled={disableSubmitButton}>
                              Sign Up
                            </Button>
                      }

                      <Button variant="link" size="lg" block onClick={handleClick}>
                          <Link to="/sign_in">Sign in</Link>
                      </Button>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
};

export default RegistrationsNew;
