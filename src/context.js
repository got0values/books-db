import React, { useState, useContext } from 'react'

// make sure to use https
import useFetch from './useFetch'
export const API_ENDPOINT = `https://openlibrary.org/search.json?`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('')
  const { isLoading, error, data: books } = useFetch(`q=${query}`)
  console.log(books);

  return (
    <AppContext.Provider value={{ isLoading, error, books, query, setQuery }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
