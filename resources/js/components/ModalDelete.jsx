import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';

const ModalDelete = ({
  showDeleteModal,
  handleDelete,
  handleClose,
  type,
}) => (
    <Modal show={showDeleteModal} onHide={handleClose}>
      <div className="modal-container">
        <Modal.Header closeButton>
            <Modal.Title>Delete board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this {type}?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" id="close" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" id='delete' onClick={handleDelete}>
                Delete
            </Button>
        </Modal.Footer>
      </div>
    </Modal>
);

ModalDelete.propTypes = {
  showDeleteModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default ModalDelete;
