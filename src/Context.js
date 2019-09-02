import React, { createContext } from 'react'

import { useLocalStorage } from './hooks/useLocalStorage'

export const Context = createContext()

const Provider = ({ children }) => {
  const auth = useLocalStorage('token')
  const BASE_URL = 'http://localhost:3000/api'

  const value = {
    auth,
    BASE_URL
  }

  return (
    <Context.Provider value={value}>
      { children }
    </Context.Provider>
  )
}

export default {
    Provider,
    Consumer: Context.Consumer
}