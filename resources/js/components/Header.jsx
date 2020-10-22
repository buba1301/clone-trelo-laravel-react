/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Nav, Navbar,
} from 'react-bootstrap';
import {
  Avatar, Button, ArrowLeftIcon, IconButton, HomeIcon,
} from 'evergreen-ui';
import { actions, asyncActions } from '../slices/index';

const Header = ({ user, dispatch, history }) => {
  const { first_name, last_name } = user;

  const fullName = [first_name, last_name].join(' ');

  const handleSignOutClick = () => {
    try {
      dispatch(asyncActions.signOut());
      dispatch(actions.signOutBoard({}));
      dispatch(actions.signOutCurrentBoard());
      history.push('/sign_in');
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
      <header>
          <Navbar bg="dark" variant="dark">
              <Nav className="mr-auto">
                  <IconButton icon={HomeIcon} height={40} is="a" href="/" />
              </Nav>
              <Nav.Item as="li">
                  <Nav.Link href="/">
                      <span className="logo" />
                  </Nav.Link>
              </Nav.Item>
              <Navbar.Brand href="/">
                  <Avatar isSolid name={fullName} size={40} />
              </Navbar.Brand>
              <Button
                marginBottom={8}
                marginRight={12}
                iconBefore={ArrowLeftIcon}
                intent="danger"
                onClick={handleSignOutClick}
              >
                SignOut
              </Button>
          </Navbar>
      </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Header;

// ;
