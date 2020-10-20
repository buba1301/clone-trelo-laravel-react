import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  Button, Form, FormControl, FormGroup, Spinner,
} from 'react-bootstrap';
import { actions, asyncActions } from '../../slices/index';
import modalDeleteConfig from '../../config/modalDeleteType';

import ModalDelete from '../ModalDelete.jsx';

const renderSubmitButton = (fetching, f) => {
  if (fetching) {
    return (
          <Button variant="primary" block disabled>
              <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
              />
              Loading...
          </Button>
    );
  }
  return (
        <Button variant="dark" type="submit" disabled={f.errors.name}>
            Edit name
        </Button>
  );
};

const Header = ({
  dispatch,
  name,
  listId,
  authToken,
  showEditNameListForm,
  showDeleteModal,
  boardId,
  fetching,
}) => {
  const modalDeleteType = modalDeleteConfig.list;

  const handleOpenEdit = () => {
    dispatch(actions.showEditNameListForm({
      listId,
      showForm: !showEditNameListForm,
    }));
  };

  const handleCloseDelete = () => dispatch(actions.showDeleteModal(!showDeleteModal));
  const handleOpenDelete = () => dispatch(actions.showDeleteModal(!showDeleteModal));

  const handleDeleteList = () => {
    try {
      dispatch(asyncActions.fetchDeleteList(boardId, listId, authToken));
      dispatch(actions.showDeleteModal(!showDeleteModal));
    } catch (e) {
      console.log(e.response);
    }
  }; // clear func or not?

  const handleSubmit = (values, { resetForm }) => {
    try {
      dispatch(asyncActions.updateListName(values, listId, boardId, authToken));
      dispatch(actions.showEditNameListForm({ listId, showForm: !showEditNameListForm }));
    } catch (e) {
      console.log(e);
    }
    dispatch(actions.setFetching(false));
    resetForm();
  };

  const f = useFormik({
    initialValues: {
      name: `${name}`,
    },
    onSubmit: handleSubmit,
  });

  if (showEditNameListForm) {
    return (
        <Form onSubmit={f.handleSubmit}>
            <FormGroup>
                <FormControl
                    name="name"
                    type="text"
                    placeholder={name}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.name}
                    disabled={f.isSubmitting}
                    // isInvalid={!!f.errors.email}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {f.errors.name ? f.errors.name : null}
                </Form.Control.Feedback>
            </FormGroup>
            {renderSubmitButton(fetching, f)}
            or
            <Button variant="link" onClick={handleOpenEdit}>
                Cancel
            </Button>
        </Form>
    );
  }

  return (
      <div className="navbar navbar-light bg-light">
          <div>{name}</div>
          <ul className="nav nav-pills">
              <li className="nav-item dropdown">
                  <a
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                  ></a>
                  <div className="dropdown-menu">
                      <button
                          className="btn btn-link dropdown-item"
                          href="#"
                          onClick={handleOpenEdit}
                      >
                          Edit list
                      </button>
                      <div role="separator" className="dropdown-divider"></div>
                      <a
                          className="dropdown-item"
                          href="#three"
                          onClick={handleOpenDelete}
                      >
                          Delete list
                      </a>
                  </div>
              </li>
          </ul>
          <ModalDelete
              showDeleteModal={showDeleteModal}
              handleClose={handleCloseDelete}
              handleDelete={handleDeleteList}
              type={modalDeleteType}
          />
      </div>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  listId: PropTypes.number.isRequired,
  boardId: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
  showEditNameListForm: PropTypes.bool.isRequired,
  showDeleteModal: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default Header;
