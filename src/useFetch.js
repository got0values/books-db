import { useState, useEffect } from 'react'
const API_ENDPOINT = `https://openlibrary.org/search.json?`

const paginate = (books) => {
    const itemsPerPage = 10
    const numberOfPages = Math.ceil(books.length / itemsPerPage)
    const newBooks = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage
        return books.slice(start, start + itemsPerPage)
    })
    return newBooks
}

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [data, setData] = useState(null)
  const fetchBooks = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      if (data) {
        console.log(paginate(data.docs))
        setData(paginate(data.docs))
        setError({ show: false, msg: '' })
      } else {
        setError({ show: true, msg: data.Error })
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBooks(`${API_ENDPOINT}${urlParams}`)
  }, [urlParams])
  return { isLoading, error, data }
}

export default useFetch
