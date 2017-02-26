import React from 'react'
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

const ProductModal = ({ show, onHide, product, onChangeName, onChangePrice, onSubmitForm }) => (
  <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">{ product.id ? 'Edit the product' : 'Create a new product' }</Modal.Title>
    </Modal.Header>
    <Form horizontal onSubmit={onSubmitForm}>
      <Modal.Body>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={3}>
            Product
          </Col>
          <Col sm={9}>
            <FormControl 
              type="text" 
              value={product.name}
              placeholder="Product name" 
              onChange={onChangeName}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPrice">
          <Col componentClass={ControlLabel} sm={3}>
            Price
          </Col>
          <Col sm={9}>
            <FormControl 
              type="text" 
              defaultValue={product.price}
              placeholder="0.99" 
              onChange={onChangePrice}
            />
          </Col>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" bsStyle="primary">{ product.id ? 'Save' : 'Create' }</Button>
        <Button onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Form>
  </Modal>
)

export default ProductModal