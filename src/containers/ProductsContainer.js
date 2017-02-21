import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  fetchProducts,
  createProduct,
  editProduct,
  removeProduct
} from '../actions/products'
import Products from '../components/Products'

class ProductsContainer extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.title = "Product list"
    const { dispatch } = this.props
    dispatch(fetchProducts())
  }

  createOrEditProduct(product) {
    const { dispatch } = this.props
    if (product.id)
      dispatch(editProduct({ ...product }))
    else
      dispatch(createProduct({ ...product }))
  }

  deleteProduct(id) {
    const { dispatch } = this.props
    dispatch(removeProduct(id))
  }

  render() {
    const { products, isLoading, dispatch } = this.props
    return (
      <Products 
        products={products}
        isLoading={isLoading}
        createOrEditProduct={this.createOrEditProduct.bind(this)}
        deleteProduct={this.deleteProduct.bind(this)}
      />
    )
  }
}

const mapStateToProps = store => ({
  products: store.products.items,
  isLoading: store.products.isLoading
})

// const mapDispatchToProps = dispatch => ({
//   getProducts: () => {
//     dispatch(fetchProducts())
//   }
// }) 
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(ProductsContainer)