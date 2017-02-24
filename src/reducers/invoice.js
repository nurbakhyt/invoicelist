import {
  CHANGE_DISCOUNT,
  SELECT_CUSTOMER,
  SELECT_PRODUCT_TO_ADD,
  ADD_PRODUCT_TO_INVOICE,
  CHANGE_PRODUCT_QUANTITY,
  DELETE_PRODUCT_FROM_INVOICE,
  CALC_TOTAL,
  CREATED_INVOICE,
  EDIT_INVOICE,
  FETCH_INVOICE,
  FETCH_INVOICE_ITEMS
} from '../actions/invoice'

const initialState = {
  id: 0,
  discount: 0,
  customer: {},
  product: {},
  products: [],
  total: 0,
  discountTotal: 0
}

const invoice = (state = initialState, action) => {  
  switch(action.type) {
    case CHANGE_DISCOUNT:
      return {
        ...state,
        discount: action.discount,
        discountTotal: state.total * (100 - action.discount) / 100
      }
    case SELECT_CUSTOMER:
      return {
        ...state,
        customer: action.customer
      }
    case SELECT_PRODUCT_TO_ADD:
      return {
        ...state,
        product: {
          ...action.product
        }
      }
    case ADD_PRODUCT_TO_INVOICE:
      return {
        ...state,
        products: [
          ...state.products,
          {
            ...state.product,
            quantity: 1
          }
        ],
        total: state.total + state.product.price,
        discountTotal:  (state.total + state.product.price) * (100 - state.discount) / 100
      }
    case CHANGE_PRODUCT_QUANTITY:
      return {
        ...state,
        products: state.products.map(p => {
          if (p.value === action.product.value)
            return {
              ...action.product
            }
          else return {
            ...p
          }
        })
      }
    case DELETE_PRODUCT_FROM_INVOICE:
    case CALC_TOTAL:
      return {
        ...state,
        total: action.total,
        discountTotal: action.total * (100 - state.discount) / 100
      }
    case FETCH_INVOICE:
      return {
        id: action.invoice.id,
        discount: action.invoice.discount,
        discountTotal: action.invoice.total,
        customer: {
          value: action.invoice.customer_id
        }
      }
    default:
      return state
  }
}

export default invoice