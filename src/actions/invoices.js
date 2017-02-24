export const REQUEST_INVOICES = 'REQUEST_INVOICES'
export const RECEIVE_INVOICES = 'RECEIVE_INVOICES'
export const CREATING_INVOICE = 'CREATING_INVOICE'
export const CREATED_INVOICE = 'CREATED_INVOICE'
export const EDITING_INVOICE = 'EDITING_INVOICE'
export const EDITED_INVOICE = 'EDITED_INVOICE'
export const DELETED_INVOICE = 'DELETED_INVOICE'

const requestInvoices = () => ({
  type: REQUEST_INVOICES
})
const receiveInvoices = json => ({
  type: RECEIVE_INVOICES,
  invoices: json
})
export const fetchInvoices = () => dispatch => {
  dispatch(requestInvoices())
  return fetch('http://localhost:8000/api/invoices')
    .then(response => response.json())
    .then(json => dispatch(receiveInvoices(json)))
}

const creatingInvoice = () => ({
  type: CREATING_INVOICE
})
const createdInvoice = () => ({
  type: CREATED_INVOICE
})
export const createInvoice = invoice => dispatch => {
  dispatch(creatingInvoice())
  const body = 'name=' + encodeURIComponent(invoice.name)
    + '&address=' + encodeURIComponent(invoice.address)
    + '&phone=' + encodeURIComponent(invoice.phone)
  return fetch('http://localhost:8000/api/invoices', {
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
            dispatch(createdInvoice())
            console.log('Created a new invoice')
            dispatch(fetchInvoices())
          })
      } else {
        console.log('Failed create a new invoice')
      }
    })
}

const editingInvoice = () => ({
  type: EDITING_INVOICE
})
const editedInvoice = () => ({
  type: EDITED_INVOICE
})
export const editInvoice = invoice => dispatch => {
  dispatch(editingInvoice())
  const body = 'name=' + encodeURIComponent(invoice.name)
    + '&address=' + encodeURIComponent(invoice.address)
    + '&phone=' + encodeURIComponent(invoice.phone)
  return fetch(`http://localhost:8000/api/invoices/${invoice.id}`, {
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
            dispatch(editedInvoice())
            console.log('Edited the invoice')
            dispatch(fetchInvoices())
          })
      } else {
        console.log('Failed edit the invoice')
      }
    })
}

const deletedInvoice = () => ({
  type: DELETED_INVOICE
})
export const removeInvoice = id => dispatch => {
  return fetch(`http://localhost:8000/api/invoices/${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            dispatch(deletedInvoice())
            console.log('Deleted the invoice')
            dispatch(fetchInvoices())
          })
      } else {
        console.log('Failed delete the invoice')
      }
    })
}