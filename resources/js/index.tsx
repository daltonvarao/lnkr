import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './src/routes'

import AuthProvider from './src/providers/auth'
import AlertProvider from './src/providers/alerts'

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <Routes />
      </AlertProvider>
    </AuthProvider>
  )
}

const container = document.querySelector('#root')

if (container) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
  )
}
