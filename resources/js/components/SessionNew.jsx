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
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { setDocumentTitle } from '../utils';
import { asyncActions, actions } from '../slices/index';

const SessionNew = () => {
  const errors = useSelector((state) => state.session.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  const { signIn } = asyncActions;
  const { loginErrors } = actions;

  // eslint-disable-next-line max-len

  useEffect(() => {
    setDocumentTitle('SignIn');
  }, [errors]);

  const handleSubmit = async (values, { resetForm, setStatus }) => {
    try {
      await dispatch(signIn(values));
      resetForm();
      history.push('/');
    } catch (e) {
      const { data } = e.response;
      setStatus(data);
      dispatch(loginErrors(data));
    }
    setTimeout(() => setStatus(), 5000);
  };

  const f = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  console.log(useFormik({}));

  const isErrors = (values) => ((!!f.status && !!values.password) ? f.status.userNotFound : null);

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
                              isInvalid={f.touched.password && !!isErrors(f.values)}
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
                              isInvalid={f.touched.password && !!isErrors(f.values)}
                              required
                          />
                          <Form.Control.Feedback type="invalid">
                              {f.status ? f.status.userNotFound : null}
                          </Form.Control.Feedback>
                      </FormGroup>
                      <Button variant="primary" type="submit" size="lg" block >
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
