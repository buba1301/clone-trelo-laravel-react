/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Navbar,
  Spinner,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { setDocumentTitle } from '../utils';
import { asyncActions, actions } from '../slices/index';

const SessionNew = () => {
  const errors = useSelector(({ session }) => session.errors);
  const fetchingUser = useSelector(({ session }) => session.fetchingUser);

  const dispatch = useDispatch();
  const history = useHistory();

  const { signIn } = asyncActions;
  const { loginErrors } = actions;

  useEffect(() => {
    setDocumentTitle('SignIn');
  }, [errors]);

  const handleClick = () => {
    const errorsUpdate = {};
    dispatch(actions.loginErrors(errorsUpdate));
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(signIn(values));
      dispatch(actions.setFetchihg(false));
      resetForm();
      history.push('/');
    } catch (e) {
      const { data } = e.response;
      dispatch(actions.setFetchihg(false));
      dispatch(loginErrors(data));
    }
  };

  const validate = ({ email, password }) => {
    if (!email || !password) {
      const errorsUpdate = {};
      dispatch(actions.loginErrors(errorsUpdate));
    }
  };

  const f = useFormik({
    initialValues: {
      email: '',
      password: '',
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
                  <Form onSubmit={f.handleSubmit} >
                      <FormGroup>
                          <FormLabel>Email</FormLabel>
                          <FormControl
                              name="email"
                              type="text"
                              placeholder="Email"
                              onChange={f.handleChange}
                              value={f.values.email}
                              onBlur={f.handleBlur}
                              required
                              isInvalid={!!errors.userNotFound}
                              disabled={fetchingUser}
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
                              onBlur={f.handleBlur}
                              isInvalid={!!errors.userNotFound}
                              disabled={fetchingUser}
                              required
                          />
                          <Form.Control.Feedback type="invalid">
                              {errors.userNotFound ? errors.userNotFound : null}
                          </Form.Control.Feedback>
                      </FormGroup>
                      {fetchingUser
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
                        : <Button variant="primary" type="submit" size="lg" block disable={errors.userNotFound ? 'true' : 'false'}>
                              Sign In
                            </Button>
                      }{' '}
                      <Button variant="link" size="lg" block onClick={handleClick}>
                          <Link to="/sign_up">Sign up</Link>
                      </Button>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
};

export default SessionNew;
