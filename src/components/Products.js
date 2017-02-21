import React, { Component, PropTypes } from 'react'
import { Table, ButtonToolbar, Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap'

class Products extends Component {

  static propTypes = {
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createOrEditProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showProductModal: false,
      showDeleteProductModal: false,
      product: {
        id: null,
        name: '',
        price: 0
      }
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangePrice = this.onChangePrice.bind(this)
    this.handleCreateOrEditProduct = this.handleCreateOrEditProduct.bind(this)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
  }
  
  onChangeName(e) {
    this.setState({
      product: {
        ...this.state.product,
        name: e.target.value
      }
    })
  }

  onChangePrice(e) {
    this.setState({
      product: {
        ...this.state.product,
        price: Number(e.target.value)
      }
    })
  }

  handleCreateOrEditProduct(e) {
    e.preventDefault()
    const { createOrEditProduct } = this.props
    createOrEditProduct({ ...this.state.product })
    this.setState({
      showProductModal: false,
      showDeleteProductModal: false,
      product: {
        id: null,
        name: '',
        price: 0.0
      }
    })
  }

  handleDeleteProduct() {
    const { deleteProduct } = this.props
    deleteProduct(this.state.product.id)
    this.setState({
      showProductModal: false,
      showDeleteProductModal: false,
      product: {
        id: null,
        name: '',
        price: 0.0
      }
    })
  }

  render() {
    const closeProductModal = () => {
      this.setState({
        showProductModal: false,
        product: {
          id: null,
          name: '',
          price: 0.0
        }
      })
    }
    const closeDeleteProductModal = () => {
      this.setState({
        showDeleteProductModal: false,
        product: {
          id: null,
          name: '',
          price: 0.0
        }
      })
    }
    const { products, isLoading } = this.props
    return (
      <div>
        <h1>
          Product list
          &nbsp;&nbsp;
          <Button onClick={() => this.setState({ showProductModal: true })}>Create</Button>
        </h1>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th width="20%">Price</th>
              <th width="25%"></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading
              ? products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <ButtonToolbar>
                      <Button bsStyle="info" onClick={() => this.setState({ showProductModal: true, product })}>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                      </Button>
                      <Button bsStyle="danger" onClick={() => this.setState({ showDeleteProductModal: true, product })}>
                        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                      </Button>
                    </ButtonToolbar>
                  </td>
                </tr>
              ))
              : <tr><td colSpan={3}><h2>Loading...</h2></td></tr>
            }
          </tbody>
        </Table>
        <ProductModal 
          show={this.state.showProductModal} 
          onHide={closeProductModal} 
          product={{ ...this.state.product }}
          onChangeName={this.onChangeName}
          onChangePrice={this.onChangePrice}
          onSubmitForm={this.handleCreateOrEditProduct}
        />
        <DeleteProductModal
          show={this.state.showDeleteProductModal}
          onHide={closeDeleteProductModal}
          product={{ ...this.state.product }}
          deleteProduct={this.handleDeleteProduct}
        />
      </div>
    )
  }
}

const ProductModal = ({ show, onHide, product, onChangeName, onChangePrice, onSubmitForm }) => (
  <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-lg">{ product.id ? 'Edit the product' : 'Create a new product' }</Modal.Title>
    </Modal.Header>
    <Form horizontal onSubmit={onSubmitForm}>
      <Modal.Body>
        <FormGroup controlId="formHorizontalEmail">
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
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={3}>
            Price
          </Col>
          <Col sm={9}>
            <FormControl 
              type="text" 
              value={product.price}
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

export default Products