import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  CREATING_PRODUCT,
  CREATED_PRODUCT,
  EDITING_PRODUCT,
  EDITED_PRODUCT,
  DELETED_PRODUCT
} from '../actions/products'

const initialState = {
  isLoading: false,
  items: []
}

const products = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_PRODUCTS:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        items: action.products
      }
    case CREATING_PRODUCT:
    case CREATED_PRODUCT:
    default:
      return state
  }
}

export default products