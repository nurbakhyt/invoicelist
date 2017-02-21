import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  fetchCustomers,
  createCustomer,
  editCustomer,
  removeCustomer
} from '../actions/customers'
import Customers from '../components/Customers'

class CustomersContainer extends Component {
  static propTypes = {
    customers: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.title = "Customer list"
    const { dispatch } = this.props
    dispatch(fetchCustomers())
  }

  createOrEditCustomer(customer) {
    const { dispatch } = this.props
    if (customer.id)
      dispatch(editCustomer({ ...customer }))
    else
      dispatch(createCustomer({ ...customer }))
  }

  deleteCustomer(id) {
    const { dispatch } = this.props
    dispatch(removeCustomer(id))
  }

  render() {
    const { customers, isLoading, dispatch } = this.props
    return (
      <Customers 
        customers={customers}
        isLoading={isLoading}
        createOrEditCustomer={this.createOrEditCustomer.bind(this)}
        deleteCustomer={this.deleteCustomer.bind(this)}
      />
    )
  }
}

const mapStateToProps = store => ({
  customers: store.customers.items,
  isLoading: store.customers.isLoading
})

// const mapDispatchToProps = dispatch => ({
// }) 
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(CustomersContainer)