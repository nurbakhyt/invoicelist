import React, { Component, PropTypes } from 'react'
import { Table, Button, ButtonToolbar  } from 'react-bootstrap'
import DeleteInvoiceModal from './DeleteInvoiceModal'

class InvoiceList extends Component {
  
  static propTypes = {
    invoices: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    deleteInvoice: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { showDeleteInvoiceModal: false }
    this.handleDeleteInvoice = this.handleDeleteInvoice.bind(this)
  }

  handleDeleteInvoice(id) {
    const { deleteInvoice } = this.props
    deleteInvoice(id)
    this.setState({
      showDeleteInvoiceModal: false,
      invoice: {}    
    })
  }
  
  render() {
    const closeDeleteInvoiceModal = () => this.setState({ showDeleteInvoiceModal: false })
    const { invoices, isLoading } = this.props
    return (
      <div>
        <h1>
          Invoice list
          &nbsp;&nbsp;
          <Button href="/invoices/new">Create</Button>
        </h1>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th width="30%">Custommer</th>
              <th width="20%">Discount</th>
              <th width="20%">Total</th>
              <th width="20%"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? <tr><td colSpan={3}><h2>Loading...</h2></td></tr>
              : invoices.length
                ? invoices.map((invoice, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{invoice.customer_id}</td>
                    <td>{invoice.discount}</td>
                    <td>{invoice.total}</td>
                    <td>
                      <ButtonToolbar>
                        <Button bsStyle="info" href={'invoices/' + invoice.id}>
                          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </Button>
                        <Button bsStyle="danger" onClick={() => this.setState({ showDeleteCustomerModal: true, customer }) }>
                          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                        </Button>
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))
                : <tr><td colSpan={3}><h3>No invoices</h3></td></tr>
            }
          </tbody>
        </Table>
        <DeleteInvoiceModal
          show={this.state.showDeleteInvoiceModal}
          onHide={closeDeleteInvoiceModal}
          invoice={{ ...this.state.invoice }}
          deleteInvoice={this.handleDeleteInvoice}
        />
      </div>
    )
  }
}

export default InvoiceList