export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const CREATING_PRODUCT = 'CREATING_PRODUCT'
export const CREATED_PRODUCT = 'CREATED_PRODUCT'
export const EDITING_PRODUCT = 'EDITING_PRODUCT'
export const EDITED_PRODUCT = 'EDITED_PRODUCT'
export const DELETED_PRODUCT = 'DELETED_PRODUCT'

const requestProducts = () => ({
  type: REQUEST_PRODUCTS
})
const receiveProducts = json => ({
  type: RECEIVE_PRODUCTS,
  products: json
})
export const fetchProducts = () => dispatch => {
  dispatch(requestProducts())
  return fetch('http://localhost:8000/api/products')
    .then(response => response.json())
    .then(json => dispatch(receiveProducts(json)))
}

const creatingProduct = () => ({
  type: CREATING_PRODUCT
})
const createdProduct = () => ({
  type: CREATED_PRODUCT
})
export const createProduct = product => dispatch => {
  dispatch(creatingProduct())
  const body = 'name=' + encodeURIComponent(product.name) + '&price=' + encodeURIComponent(product.price)
  return fetch('http://localhost:8000/api/products', {
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
            dispatch(createdProduct())
            console.log('Created a new product')
            dispatch(fetchProducts())
          })
      } else {
        console.log('Failed create a new product')
      }
    })
}

const editingProduct = () => ({
  type: EDITING_PRODUCT
})
const editedProduct = () => ({
  type: EDITED_PRODUCT
})
export const editProduct = product => dispatch => {
  dispatch(editingProduct())
  const body = 'name=' + encodeURIComponent(product.name) + '&price=' + encodeURIComponent(product.price)
  return fetch(`http://localhost:8000/api/products/${product.id}`, {
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
            dispatch(editedProduct())
            console.log('Edited the product')
            dispatch(fetchProducts())
          })
      } else {
        console.log('Failed edit the product')
      }
    })
}

const deletedProduct = () => ({
  type: DELETED_PRODUCT
})
export const removeProduct = id => dispatch => {
  return fetch(`http://localhost:8000/api/products/${id}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            dispatch(deletedProduct())
            console.log('Deleted the product')
            dispatch(fetchProducts())
          })
      } else {
        console.log('Failed delete the product')
      }
    })
}
