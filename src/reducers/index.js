import { combineReducers } from 'redux'

import products from './products'
import customers from './customers'
import invoices from './invoices'
import invoice from './invoice'

const rootReducer = combineReducers({
  products,
  customers,
  invoices,
  invoice
})

export default rootReducer