import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeleteCustomerModal = ({ show, onHide, customer, deleteCustomer }) => (
  <Modal show={show} onHide={onHide} bsSize="small" aria-labelledby="contained-modal-title-sm">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-small">Are you sure to delete the customer?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>"{customer.name}", {customer.phone}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={deleteCustomer} bsStyle="danger">Yes</Button>
      <Button onClick={onHide}>No</Button>
    </Modal.Footer>
  </Modal>
)

export default DeleteCustomerModal