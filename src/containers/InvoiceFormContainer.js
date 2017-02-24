import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import InvoiceForm from '../components/invoices/InvoiceForm'
import { fetchProducts } from '../actions/products'
import { fetchCustomers } from '../actions/customers'
import { fetchInvoice } from '../actions/invoice'

class InvoiceFormContainer extends Component {
  
  static propTypes = {
    // invoices: PropTypes.array.isRequired,
    // isLoading: PropTypes.bool.isRequired,
    // dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.title = "New invoice"
    const { dispatch, params } = this.props
    dispatch(fetchProducts())
    dispatch(fetchCustomers())
    if (params.id)
      dispatch(fetchInvoice(params.id))
  }

  render() {
    const { customers, products, invoice, isLoading, dispatch, subscribe, params } = this.props
    return (
      <InvoiceForm
        customers={customers}
        products={products}
        invoice={invoice}
        isLoading={isLoading}
        dispatch={dispatch}
        id={params.id}
      />
    )
  }
}

const mapStateToProps = store => ({
  customers: store.customers.items,
  products: store.products.items,
  isLoading: store.customers.isLoading || store.products.isLoading,
  invoice: store.invoice
})

export default connect(mapStateToProps)(InvoiceFormContainer)