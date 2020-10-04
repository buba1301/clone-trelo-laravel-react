/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar, Button } from 'react-bootstrap';
import ReactGravatar from 'react-gravatar';
import { asyncActions } from '../slices/index';

const Header = ({ user, dispatch, history }) => {
  const { first_name, last_name, email } = user;

  const fullName = [first_name, last_name].join(' ');

  const handleSignOutClick = async () => {
    try {
      dispatch(asyncActions.signOut());
      history.push('/sign_in');
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
      <header className="main-header">
          <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                  <Nav.Link href="/">Boards</Nav.Link>
              </Nav>
              <Nav.Item as="li">
                  <Nav.Link href="/">
                      <span className="logo" />
                  </Nav.Link>
              </Nav.Item>
              <Navbar.Brand href="/">
                  <ReactGravatar email={email} /> {fullName}
              </Navbar.Brand>
              <Button variant="outline-danger" onClick={handleSignOutClick}>
                  SignOut
              </Button>
          </Navbar>
      </header>
  );
};

Header.proptypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  histoty: PropTypes.func,
};

export default Header;

// ;
