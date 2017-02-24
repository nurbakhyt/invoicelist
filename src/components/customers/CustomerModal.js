import React from 'react'
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

const CustomerModal = ({ show, onHide, customer, onChangeName, onChangeAddress, onChangePhone, onSubmitForm }) => (
  <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">{ customer.id ? 'Edit the customer' : 'Create a new customer' }</Modal.Title>
    </Modal.Header>
    <Form horizontal onSubmit={onSubmitForm}>
      <Modal.Body>
        <FormGroup controlId="formHorizontalName">
          <Col componentClass={ControlLabel} sm={3}>
            Customer
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              value={customer.name}
              placeholder="Customer name"
              onChange={onChangeName}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalAddress">
          <Col componentClass={ControlLabel} sm={3}>
            Address
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              value={customer.address}
              placeholder="Customer address"
              onChange={onChangeAddress}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPhone">
          <Col componentClass={ControlLabel} sm={3}>
            Phone
          </Col>
          <Col sm={9}>
            <FormControl
              type="text"
              value={customer.phone}
              placeholder="+7 771 ..."
              onChange={onChangePhone}
            />
          </Col>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" bsStyle="primary">{ customer.id ? 'Save' : 'Create' }</Button>
        <Button onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Form>
  </Modal>
)

export default CustomerModal