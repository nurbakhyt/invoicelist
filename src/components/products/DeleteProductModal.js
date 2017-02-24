import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeleteProductModal = ({ show, onHide, product, deleteProduct }) => (
  <Modal show={show} onHide={onHide} bsSize="small" aria-labelledby="contained-modal-title-sm">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-small">Are you sure to delete the product?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>"{product.name}" - {product.price}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={deleteProduct} bsStyle="danger">Yes</Button>
      <Button onClick={onHide}>No</Button>
    </Modal.Footer>
  </Modal>
)

export default DeleteProductModal