import { browserHistory } from 'react-router'

export const CHANGE_DISCOUNT = 'CHANGE_DISCOUNT'
export const SELECT_CUSTOMER = 'SELECT_CUSTOMER'
export const SELECT_PRODUCT_TO_ADD = 'SELECT_PRODUCT_TO_ADD'
export const ADD_PRODUCT_TO_INVOICE = 'ADD_PRODUCT_TO_INVOICE'
export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY'
export const DELETE_PRODUCT_FROM_INVOICE = 'DELETE_PRODUCT_FROM_INVOICE'
export const CALC_TOTAL = 'CALC_TOTAL'
export const CREATED_INVOICE = 'CREATED_INVOICE'
export const EDIT_INVOICE = 'EDIT_INVOICE'
export const FETCH_INVOICE = 'FETCH_INVOICE'
export const FETCH_INVOICE_ITEMS = 'FETCH_INVOICE_ITEMS'

export const changeDiscount = discount => ({
  type: CHANGE_DISCOUNT,
  discount
})
export const changeInvoiceCustomer = customer => ({
  type: SELECT_CUSTOMER,
  customer
})

export const changeInvoiceProduct = product => ({
  type: SELECT_PRODUCT_TO_ADD,
  product
})

export const addProductToInvoice = () => ({
  type: ADD_PRODUCT_TO_INVOICE
})

const changingQuantity = (product, quantity) => ({
  type: CHANGE_PRODUCT_QUANTITY,
  product: {
    ...product,
    quantity
  }
})

export const changeQuantity = (product, quantity) => (dispatch, getState) => {
  const myPromise = () => new Promise(resolve => {
    dispatch(changingQuantity(product, quantity))
    resolve()
  })
  let total = 0
  myPromise()
    .then(() => {
      const { products } = getState().invoice
      products.forEach(product => total += product.price * product.quantity)
      dispatch(calcTotal(total))
    })
}

export const calcTotal = total => ({
  type: CALC_TOTAL,
  total
})

const createdInvoice = () => ({
  type: CREATED_INVOICE
})

export const createInvoice = invoice => dispatch => {
  const body = 'discount=' + encodeURIComponent(invoice.discount)
    + '&customer_id=' + encodeURIComponent(invoice.customer.value)
    + '&total=' + encodeURIComponent(invoice.discountTotal.toFixed(2))
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
            browserHistory.push('/')
          })
      } else {
        console.log('Failed create a new invoice')
      }
    })
}

const requestInvoice = invoice => ({
  type: FETCH_INVOICE,
  invoice
})

export const fetchInvoice = id => dispatch => {
  return fetch(`http://localhost:8000/api/invoices/${id}`)
    .then(response => response.json())
    .then(json => {
      dispatch(requestInvoice(json))
    })
}