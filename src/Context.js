import React, { useState, createContext } from 'react'

import { useLocalStorage } from './hooks/useLocalStorage'

export const Context = createContext()

const Provider = ({ children }) => {
  const auth = useLocalStorage('token')

  const value = {
    auth
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