import React, { Component, PropTypes } from 'react'
import { Table, ButtonToolbar, Button } from 'react-bootstrap'
import CustomerModal from './CustomerModal'
import DeleteCustomerModal from './DeleteCustomerModal'

class CustomerList extends Component {

  static propTypes = {
    customers: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createOrEditCustomer: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      showCustomerModal: false,
      showDeleteCustomerModal: false,
      customer: {
        id: null,
        name: '',
        address: '',
        phone: ''
      }
    }
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.onChangePhone = this.onChangePhone.bind(this)
    this.handleCreateOrEditCustomer = this.handleCreateOrEditCustomer.bind(this)
    this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this)
  }

  onChangeName(e) {
    this.setState({
      customer: {
        ...this.state.customer,
        name: e.target.value
      }
    })
  }

  onChangeAddress(e) {
    this.setState({
      customer: {
        ...this.state.customer,
        address: e.target.value
      }
    })
  }

  onChangePhone(e) {
    this.setState({
      customer: {
        ...this.state.customer,
        phone: e.target.value
      }
    })
  }
  
  handleCreateOrEditCustomer(e) {
    e.preventDefault()
    const { createOrEditCustomer } = this.props
    createOrEditCustomer({ ...this.state.customer })
    this.setState({
      showCustomerModal: false,
      showDeleteCustomerModal: false,
      customer: {
        id: null,
        name: '',
        address: '',
        phone: ''
      }
    })
  }

  handleDeleteCustomer() {
    const { deleteCustomer } = this.props
    deleteCustomer(this.state.customer.id)
    this.setState({
      showCustomerModal: false,
      showDeleteCustomerModal: false,
      customer: {
        id: null,
        name: '',
        address: '',
        phone: ''
      }
    })
  }
  
  render() {
    const closeCustomerModal = () => {
      this.setState({
        showCustomerModal: false,
        customer: {
          id: null,
          name: '',
          address: '',
          phone: ''
        }
      })
    }
    const closeDeleteCustomerModal = () => {
      this.setState({
        showDeleteCustomerModal: false,
        customer: {
          id: null,
          name: '',
          address: '',
          phone: ''
        }
      })
    }
    const { customers, isLoading } = this.props
    return (
      <div>
        <h1>
          Customer list
          &nbsp;&nbsp;
          <Button onClick={() => this.setState({ showCustomerModal: true })}>Create</Button>
        </h1>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th width="25%">Name</th>
              <th width="25%">Address</th>
              <th width="20%">Phone</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? <tr><td colSpan={3}><h2>Loading...</h2></td></tr>
              : customers.length
                ? customers.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <ButtonToolbar>
                        <Button bsStyle="info" onClick={() => this.setState({ showCustomerModal: true, customer }) }>
                          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </Button>
                        <Button bsStyle="danger" onClick={() => this.setState({ showDeleteCustomerModal: true, customer }) }>
                          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </Button>
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))
                : <tr><td colSpan={3}><h3>No customers</h3></td></tr>
            }
          </tbody>
        </Table>
        <CustomerModal 
          show={this.state.showCustomerModal} 
          onHide={closeCustomerModal} 
          customer={{ ...this.state.customer }}
          onChangeName={this.onChangeName}
          onChangeAddress={this.onChangeAddress}
          onChangePhone={this.onChangePhone}
          onSubmitForm={this.handleCreateOrEditCustomer}
        />
        <DeleteCustomerModal
          show={this.state.showDeleteCustomerModal}
          onHide={closeDeleteCustomerModal}
          customer={{ ...this.state.customer }}
          deleteCustomer={this.handleDeleteCustomer}
        />
      </div>
    )
  }
}

export default CustomerList