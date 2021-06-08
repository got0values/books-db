import { useState, useEffect } from 'react'
const API_ENDPOINT = `https://openlibrary.org/isbn/`

const useFetchBook = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ show: false, msg: '' })
  const [data, setData] = useState(null)
  const fetchBooks = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data);
    
      if (data) {
        setData(data)

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
    fetchBooks(`${API_ENDPOINT}${urlParams}.json`)
  }, [urlParams])
  return { isLoading, error, data }
}

export default useFetchBook
