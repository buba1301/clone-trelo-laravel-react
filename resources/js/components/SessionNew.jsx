import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
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
      <Container>
          <Row className="justify-content-md-center">
              <Col md="auto">
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
                              {_.has(errors, 'userNotFound')
                                  && errors.userNotFound}
                          </Form.Control.Feedback>
                      </FormGroup>
                      <Button variant="primary" type="submit" size="lg" block>
                          Sign In
                      </Button>{' '}
                      <Button variant="link" size="lg" block>
                          <Link to="/sign_up">Sign up</Link>
                      </Button>
                  </Form>
              </Col>
          </Row>
      </Container>
  );
};

export default SessionNew;
