/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table } from 'evergreen-ui';

import ModalDelete from '../ModalDelete.jsx';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Footer from './Footer.jsx';

import { actions, asyncActions } from '../../slices/index';
import modalDeleteConfig from '../../config/modalDeleteType';

const ListView = ({
  name,
  listId,
  authToken,
  dispatch,
  boardId,
  fetching,
}) => {
  const showAddNewTaskFrom = useSelector(({ currentBoard }) => currentBoard.listsUIState.byId[listId].showAddNewTaskFrom);

  const showEditNameListForm = useSelector(({ currentBoard }) => currentBoard.listsUIState.byId[listId].showEditNameListForm);

  const showDeleteModal = useSelector(({ deleteModal }) => deleteModal.showModal);
  const deleteId = useSelector(({ deleteModal }) => deleteModal.id);
  const deleteType = useSelector(({ deleteModal }) => deleteModal.type);

  // eslint-disable-next-line camelcase
  const tasks = useSelector(({ currentBoard }) => currentBoard.tasks.filter(({ list_id }) => list_id === listId));

  const modalDeleteType = modalDeleteConfig.list;

  const handleCloseDeleteModal = () => dispatch(actions.hideDeleteModal());
  const handleOpenDeleteModal = () => dispatch(actions.showDeleteModal({
    type: modalDeleteType,
    id: listId,
    showModal: true,
  }));

  const handleDeleteList = async () => {
    try {
      await dispatch(asyncActions.fetchDeleteList(boardId, deleteId, authToken));
      dispatch(actions.hideDeleteModal());
    } catch (error) {
      console.log(error.response);
    }
  }; // clear func or not?

  return (
      <div className="col-lg-3 col-sm-12 col-md-6">
          <div className="card">
              <div className="card-header">
                  <Header
                      name={name}
                      dispatch={dispatch}
                      listId={listId}
                      boardId={boardId}
                      authToken={authToken}
                      showEditNameListForm={showEditNameListForm}
                      handleOpen={handleOpenDeleteModal}
                      fetching={fetching}
                  />
              </div>

              <div className="card-body">
                    {tasks.length !== 0
                      ? <Table>
                          <Table.Body height={200} >
                            {tasks.map((task) => (

                            <Body
                              key={task.id}
                              task={task}
                              listId={listId}
                              dispatch={dispatch}
                              authToken={authToken}
                            />
                            ))}
                          </Table.Body>
                        </Table>
                      : null
                    }
              </div>
              <div className="card-footer">
                  <Footer
                      dispatch={dispatch}
                      listId={listId}
                      authToken={authToken}
                      showAddNewTaskFrom={showAddNewTaskFrom}
                  />
              </div>
          </div>
          <ModalDelete
              showDelete={showDeleteModal}
              handleClose={handleCloseDeleteModal}
              handleDelete={handleDeleteList}
              type={deleteType}
          />
      </div>
  );
};

ListView.propTypes = {
  name: PropTypes.string.isRequired,
  listId: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  boardId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
};
export default ListView;
