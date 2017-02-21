import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'

class Invoices extends Component {
  
  componentDidMount() {
    document.title = "Invoice list";
  }
  
  render() {
    return (
      <div>
        <h1>
          Invoice list
          &nbsp;&nbsp;
          <Button href="#">Create</Button>
        </h1>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Discount</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark Benson</td>
              <td>1</td>
              <td></td>
              <td><a href="">Edit</a></td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Invoices