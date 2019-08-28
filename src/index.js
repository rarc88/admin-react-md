// Modules
import React from 'react'
import ReactDOM from 'react-dom'

// Components
import { App } from './App'

import Context from './Context'

const app = document.querySelector('#app')
ReactDOM.render(
  <Context.Provider>
    <App />
  </Context.Provider>
  , app
)