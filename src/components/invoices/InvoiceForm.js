import React, { Component, PropTypes } from 'react'
import { Table, Button, Modal, Form, FormGroup, FormControl, Col, Row, ControlLabel } from 'react-bootstrap'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import {
  changeDiscount,
  changeInvoiceCustomer,
  changeInvoiceProduct,
  addProductToInvoice,
  changeQuantity,
  calcTotal,
  createInvoice,
  editInvoice
} from '../../actions/invoice'

class InvoiceForm extends Component {

  static propTypes = {
    customers: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    invoice: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  submitInvoice(e) {
    e.preventDefault()
    const { invoice, dispatch } = this.props
    if (invoice.id)
      dispatch(editInvoice({ ...invoice }))
    else dispatch(createInvoice({ ...invoice }))
  }

  render() {
    const { customers, products, invoice, isLoading, dispatch } = this.props
    const options1 = customers.map(customer => ({ label: customer.name, value: customer.id }))
    const options2 = products.map((product, i) => ({ label: product.name, value: product.id, price: product.price }))
    return (
      <div>
        <h1>{ isLoading ? 'Loading...' : 'New Invoice'}</h1>
        <Form onSubmit={this.submitInvoice.bind(this)}>
          <FormGroup controlId="discount">
            <Row>
              <Col sm={6}>
                <ControlLabel>Discount (%)</ControlLabel>
                <FormControl
                  type="text"
                  value={invoice.discount}
                  onChange={e => dispatch(changeDiscount(Number(e.target.value))) }
                  placeholder="0"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="customer">
            <Row>
              <Col sm={6}>
                <ControlLabel>Customer</ControlLabel>
                <Select
                  name="customer"
                  value={invoice.customer.value}
                  options={options1}
                  onChange={customer => dispatch(changeInvoiceCustomer(customer))}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="addproduct">
            <Row>
              <Col sm={5}>
                <ControlLabel>Add product</ControlLabel>
                <Select
                  name="addproduct"
                  value={invoice.product.value}
                  options={options2}
                  onChange={product => dispatch(changeInvoiceProduct(product))}
                />
              </Col>
              <Col sm={1}>
                <Button onClick={() => dispatch(addProductToInvoice())}>Add</Button>
              </Col>
            </Row>
          </FormGroup>
          <Table responsive>
            <thead>
              <tr>
                <th width="40%">Name</th>
                <th width="25%">Price</th>
                <th width="20%">Quantity</th>
                <th width="15%"></th>
              </tr>
            </thead>
            <tbody>
              {invoice.products.length
                ? invoice.products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.label}</td>
                    <td>{product.price}</td>
                    <td>
                      <FormControl
                        type="text"
                        value={product.quantity}
                        onChange={e => dispatch(changeQuantity({ ...product }, Number(e.target.value)))}
                        placeholder="0"
                      />
                    </td>
                    <td></td>
                  </tr>
                ))
                : <tr><td colSpan={3}><p>No products in the invoice</p></td></tr>
              }
            </tbody>
          </Table>
          <h2>Total: {invoice.total.toFixed(2) }</h2>
          <h2>Total discounted: {Math.floor(invoice.discountTotal * 100) / 100 }</h2>
          <Button type="submit">Create or Save</Button>
        </Form>
      </div>
    )
  }
}

InvoiceForm.contextTypes = {
  store: PropTypes.object
}



export default InvoiceForm