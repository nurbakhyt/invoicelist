import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import { syncHistoryWithStore } from 'react-router-redux'
import 'react-select/dist/react-select.css'

import routes from './routes'
import reducer from './reducers'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
// const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes} 
    />
  </Provider>,
  document.getElementById('app-root')
)