/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Button } from 'react-bootstrap';
import ReactGravatar from 'react-gravatar';
import { asyncActions } from '../slices/index';

const Header = ({ user, dispatch, history }) => {
  const handleSignOutClick = async () => {
    try {
      dispatch(asyncActions.signOut());
      history.push('/sign_in');
    } catch (e) {
      console.log(e.response);
    }
  };

  const renderUser = (user) => {
    const { first_name, last_name, email } = user;

    const fullName = [first_name, last_name].join(' ');

    return (
        <a className="current-user">
            <ReactGravatar email={email} /> {fullName}
        </a>
    );
  };

  return (
      <header className="main-header">
          <Nav as="ul">
              <Nav.Item as="li">
                  <Nav.Link href="/">Boards</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                  <Nav.Link href="/">
                      <span className="logo" />
                  </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">{renderUser(user)}</Nav.Item>
              <Button variant="outline-danger" onClick={handleSignOutClick}>
                  SignOut
              </Button>
          </Nav>
      </header>
  );
};

Header.proptypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  histoty: PropTypes.func,
};

export default Header;
