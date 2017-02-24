import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeleteInvoiceModal = ({ show, onHide, invoice, deleteInvoice }) => (
  <Modal show={show} onHide={onHide} bsSize="small" aria-labelledby="contained-modal-title-sm">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-small">Are you sure to delete the invoice?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>"{invoice.customer_id}", {invoice.discount}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={deleteInvoice} bsStyle="danger">Yes</Button>
      <Button onClick={onHide}>No</Button>
    </Modal.Footer>
  </Modal>
)

export default DeleteInvoiceModal