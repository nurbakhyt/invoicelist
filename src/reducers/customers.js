import {
  REQUEST_CUSTOMERS,
  RECEIVE_CUSTOMERS,
  CREATING_CUSTOMER,
  CREATED_CUSTOMER,
  EDITING_CUSTOMER,
  EDITED_CUSTOMER,
  DELETED_CUSTOMER
} from '../actions/customers'

const initialState = {
  isLoading: false,
  items: []
}

const customers = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_CUSTOMERS:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_CUSTOMERS:
      return {
        ...state,
        isLoading: false,
        items: action.customers
      }
    case CREATING_CUSTOMER:
    case CREATED_CUSTOMER:
    default:
      return state
  }
}

export default customers