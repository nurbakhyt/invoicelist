import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  fetchInvoices,
  removeInvoice
} from '../actions/invoices'
import InvoiceList from '../components/invoices/InvoiceList'

class InvoicesContainer extends Component {
  
  static propTypes = {
    invoices: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.title = "Invoice list"
    const { dispatch } = this.props
    dispatch(fetchInvoices())
  }

  deleteInvoice(id) {
    const { dispatch } = this.props
    dispatch(removeInvoice(id))
  }
  
  render() {
    const { invoices, isLoading, dispatch } = this.props
    return (
      <InvoiceList 
        invoices={invoices}
        isLoading={isLoading}
        deleteInvoice={this.deleteInvoice.bind(this)}
      />
    )
  }
}

const mapStateToProps = store => ({
  invoices: store.invoices.items,
  isLoading: store.invoices.isLoading
})

export default connect(
  mapStateToProps
)(InvoicesContainer)