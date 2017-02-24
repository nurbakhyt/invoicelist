import {
  REQUEST_INVOICES,
  RECEIVE_INVOICES,
  CREATING_INVOICE,
  CREATED_INVOICE,
  EDITING_INVOICE,
  EDITED_INVOICE,
  DELETED_INVOICE
} from '../actions/invoices'

const initialState = {
  isLoading: false,
  items: []
}

const invoices = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_INVOICES:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_INVOICES:
      return {
        ...state,
        isLoading: false,
        items: action.invoices
      }
    case CREATING_INVOICE:
    case CREATED_INVOICE:
    default:
      return state
  }
}

export default invoices