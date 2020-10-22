/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button, Form, FormControl, FormGroup,
} from 'react-bootstrap';
import {
  Table,
  Radio,
  Popover,
  Position,
  IconButton,
  MoreIcon,
} from 'evergreen-ui';
import { actions, asyncActions } from '../../slices/index';
import modalDeleteConfig from '../../config/modalDeleteType';

import ModalDelete from '../ModalDelete.jsx';

const Body = ({
  task, listId, dispatch, authToken, showDeleteModal,
}) => {
  const { id, name } = task;

  const modalDeleteType = modalDeleteConfig.list;

  const showEditNameTaskForm = useSelector(
    ({ currentBoard }) => currentBoard.tasksUIState.byId[id].showEditNameTaskForm,
  );

  const handleOpenCloseForm = () => {
    dispatch(
      actions.showEditNameTaskFrom({
        taskId: id,
        showFrom: !showEditNameTaskForm,
      }),
    );
  };

  const handleCloseDelete = () => dispatch(actions.showDeleteModal(!showDeleteModal));
  const handleOpenDelete = () => dispatch(actions.showDeleteModal(!showDeleteModal));

  const handleDelete = () => {
    dispatch(asyncActions.fetchDeleteTask(listId, id, authToken));
    dispatch(actions.showDeleteModal(!showDeleteModal));
  };

  const handleSubmit = (values, { resetForm }) => {
    try {
      dispatch(
        asyncActions.updateTaskName(values, listId, id, authToken),
      );
      dispatch(actions.showEditNameTaskFrom({ taskId: id, showFrom: !showEditNameTaskForm }));
      resetForm();
    } catch (e) {
      console.log(e);
    }
  };

  const f = useFormik({
    initialValues: {
      name: `${name}`,
    },
    onSubmit: handleSubmit,
  });

  if (showEditNameTaskForm) {
    return (
            <Form onSubmit={f.handleSubmit}>
                <FormGroup>
                    <FormControl
                        name="name"
                        type="text"
                        onChange={f.handleChange}
                        onBlur={f.handleBlur}
                        value={f.values.name}
                        disabled={f.isSubmitting}
                        isInvalid={!!f.errors.email}
                        required
                    />
                    <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                </FormGroup>
                <Button variant="dark" type="submit">
                    Edit name
                </Button>
                or
                <Button variant="link" onClick={handleOpenCloseForm}>
                    Cancel
                </Button>
            </Form>
    );
  }

  return (
      <>
            <Table.VirtualBody height={200}>
                <Radio checked size={16} name={name} label="Radio default" />
                <Table.Cell width={48} flex="none">
                    <Popover
                      // content={this.renderRowMenu}
                      position={Position.BOTTOM_RIGHT}
                    >
                        <IconButton icon={MoreIcon} height={24} appearance="minimal" />
                    </Popover>
                </Table.Cell>
            </Table.VirtualBody>
        <ModalDelete
            showDeleteModal={showDeleteModal}
            handleClose={handleCloseDelete}
            handleDelete={handleDelete}
            type={modalDeleteType}
        />
      </>
  );
};

Body.propTypes = {
  task: PropTypes.object.isRequired,
  listId: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  showDeleteModal: PropTypes.bool.isRequired,
};

export default Body;

// {f.errors.name ? f.errors.name : null}
// disabled={f.errors.name}

/* <li className="list-group-item">
              <div className="form-check form-check-inline">
                  <input
                      className="form-check-input position-static"
                      type="radio"
                      name="taskRadio"
                      id={`taskRadio${id}`}
                      value="option1"
                  />
                  <label
                      className="form-check-label"
                      htmlFor={`taskRadio${id}`}
                  >
                      {name}
                  </label>
                  <div className="dropright">
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
                              onClick={handleOpenCloseForm}
                          >
                              Edit task
                          </button>
                          <div
                              role="separator"
                              className="dropdown-divider"
                          ></div>
                          <a
                              className="dropdown-item"
                              href="#three"
                              onClick={handleOpenDelete}
                          >
                              Delete task
                          </a>
                      </div>
                  </div>
              </div>
          </li> */
