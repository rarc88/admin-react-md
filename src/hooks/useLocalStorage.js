import { useState } from 'react'

export function useLocalStorage(key) {
    const [value, setValue] = useState(() => {
      try {
        return window.localStorage.getItem(key)
      } catch (error) {
        console.log(error)
      }
    })
  
    const setItem = value => {
      try {
        window.localStorage.setItem(key, value)
        setValue(value)
      } catch (error) {
        console.log(error)
      }
    }
  
    const removeItem = () => {
      try {
        window.localStorage.removeItem(key)
        setValue(undefined)
      } catch (error) {
        console.log(error)
      }
    }
  
    return { value, setItem, removeItem }
  }