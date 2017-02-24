import React, { Component, PropTypes } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import ProductModal from './ProductModal'
import DeleteProductModal from './DeleteProductModal'

class ProductList extends Component {

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
            {isLoading
              ? <tr><td colSpan={3}><h2>Loading...</h2></td></tr>
              : products.length
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
                : <tr><td colSpan={3}><h3>No products</h3></td></tr>
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

export default ProductList