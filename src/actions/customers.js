export const REQUEST_CUSTOMERS = 'REQUEST_CUSTOMERS'
export const RECEIVE_CUSTOMERS = 'RECEIVE_CUSTOMERS'
export const CREATING_CUSTOMER = 'CREATING_CUSTOMER'
export const CREATED_CUSTOMER = 'CREATED_CUSTOMER'
export const EDITING_CUSTOMER = 'EDITING_CUSTOMER'
export const EDITED_CUSTOMER = 'EDITED_CUSTOMER'
export const DELETED_CUSTOMER = 'DELETED_CUSTOMER'

const requestCustomers = () => ({
  type: REQUEST_CUSTOMERS
})
const receiveCustomers = json => ({
  type: RECEIVE_CUSTOMERS,
  customers: json
})
export const fetchCustomers = () => dispatch => {
  dispatch(requestCustomers())
  return fetch('http://localhost:8000/api/customers')
    .then(response => response.json())
    .then(json => dispatch(receiveCustomers(json)))
}

const creatingCustomer = () => ({
  type: CREATING_CUSTOMER
})
const createdCustomer = () => ({
  type: CREATED_CUSTOMER
})
export const createCustomer = customer => dispatch => {
  dispatch(creatingCustomer())
  const body = 'name=' + encodeURIComponent(customer.name)
    + '&address=' + encodeURIComponent(customer.address)
    + '&phone=' + encodeURIComponent(customer.phone)
  return fetch('http://localhost:8000/api/customers', {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'POST',
    body: body
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            dispatch(createdCustomer())
            console.log('Created a new customer')
            dispatch(fetchCustomers())
          })
      } else {
        console.log('Failed create a new customer')
      }
    })
}

const editingCustomer = () => ({
  type: EDITING_CUSTOMER
})
const editedCustomer = () => ({
  type: EDITED_CUSTOMER
})
export const editCustomer = customer => dispatch => {
  dispatch(editingCustomer())
  const body = 'name=' + encodeURIComponent(customer.name)
    + '&address=' + encodeURIComponent(customer.address)
    + '&phone=' + encodeURIComponent(customer.phone)
  return fetch(`http://localhost:8000/api/customers/${customer.id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'PUT',
    body: body
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            dispatch(editedCustomer())
            console.log('Edited the customer')
            dispatch(fetchCustomers())
          })
      } else {
        console.log('Failed edit the customer')
      }
    })
}

const deletedCustomer = () => ({
  type: DELETED_CUSTOMER
})
export const removeCustomer = id => dispatch => {
  return fetch(`http://localhost:8000/api/customers/${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            dispatch(deletedCustomer())
            console.log('Deleted the customer')
            dispatch(fetchCustomers())
          })
      } else {
        console.log('Failed delete the customer')
      }
    })
}