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
  Checkbox,
  Popover,
  Position,
  IconButton,
  MoreIcon,
  Menu,
} from 'evergreen-ui';
import { actions, asyncActions } from '../../slices/index';

const renderRowMenu = (handleDelete, handleOpenCloseForm) => (
        <Menu>
            <Menu.Group>
                <Menu.Item onClick={handleOpenCloseForm}>Edit...</Menu.Item>
            </Menu.Group>
            <Menu.Divider />
            <Menu.Group>
                <Menu.Item intent='danger' onClick={handleDelete}>Delete</Menu.Item>
            </Menu.Group>
        </Menu>
);

const Body = ({
  task, listId, dispatch, authToken,
}) => {
  const { id, name } = task;

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

  const handleDelete = () => {
    dispatch(asyncActions.fetchDeleteTask(listId, id, authToken));
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
        <Table.Row>
            <Table.Cell>
                <Checkbox size={16} label={name} />
            </Table.Cell>
            <Table.Cell width={48} flex="none">
                <Popover
                    content={renderRowMenu(handleDelete, handleOpenCloseForm)}
                    position={Position.BOTTOM_RIGHT}
                >
                    <IconButton icon={MoreIcon} height={24} appearance="minimal" />
                </Popover>
            </Table.Cell>
        </Table.Row>

      </>
  );
};

Body.propTypes = {
  task: PropTypes.object.isRequired,
  listId: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Body;
