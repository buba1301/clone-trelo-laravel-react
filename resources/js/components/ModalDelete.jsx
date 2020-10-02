import React from 'react';
import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';

const ModalDelete = ({ showDeleteModal, handleClose, handleDeleteBoard }) => (
    <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Delete board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the board?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={handleDeleteBoard}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ModalDelete;
