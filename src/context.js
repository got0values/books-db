import React, { useState, useContext } from 'react'

// make sure to use https
import useFetch from './useFetch'
export const API_ENDPOINT = `https://openlibrary.org/search.json?`
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [query, setQuery] = useState('')
    const { isLoading, error, data } = useFetch(`q=${query}`)
    const [page, setPage] = useState(0)
    const [books, setBooks] = useState([])
    // console.log(data);

  return (
    <AppContext.Provider value={{ isLoading, error, data, query, setQuery, page, setPage, books, setBooks }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
