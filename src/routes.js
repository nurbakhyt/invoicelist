import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import ProductsContainer from './containers/ProductsContainer'
import CustomersContainer from './containers/CustomersContainer'
import InvoicesContainer from './containers/InvoicesContainer'
import InvoiceFormContainer from './containers/InvoiceFormContainer'
import NotFound from './components/NotFound'

export default (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={InvoicesContainer} />
      <Route path='invoices/new' component={InvoiceFormContainer} />
      <Route path='invoices/:id' component={InvoiceFormContainer} />
      <Route path='products' component={ProductsContainer} />
      <Route path='customers' component={CustomersContainer} />
      <Route path='*' component={NotFound} />
    </Route>
  </div>
)