import React from 'react'
import { useParams, Link } from 'react-router-dom'
// import { API_ENDPOINT } from './context'
import useFetchBook from './useFetchBook'

const url =
  '/256px-No_image_available.svg.png'

const SingleBook = () => {
  const { id } = useParams()
  const { isLoading, error, data: book } = useFetchBook(id)

  if (isLoading) {
    return <div className='loading'></div>
  }
  if (error.show) {
    return (
      <div className='page-error'>
        <h1>{error.msg}</h1>
        <Link to='/' className='btn'>
          back to books
        </Link>
      </div>
    )
  }
  const { isbn_13: isbn, subtitle, title, first_sentence: plot, publish_date } = book
  console.log(book.plot)
  return (
    <section className='single-book'>
      <img src={isbn ? `https://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg` : url } alt={title} />
      <div className='single-book-info'>
        <h2>{title}{subtitle ? ` : ${subtitle}` : ''}</h2>
        <p>{plot ? plot.value : ''}</p>
        <h4>{publish_date}</h4>
        <Link to='/' className='btn'>
          back to books
        </Link>
      </div>
    </section>
  )
}

export default SingleBook
