import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'

const url =
  '/256px-No_image_available.svg.png'


const Books = () => {
  const { books, isLoading } = useGlobalContext()

    if (isLoading) {
    return <div className='loading'></div>
  }

    return (
        <section className='books'>
        {books.docs.map((book) => {
            const { key, isbn, publish_year: year, title, author_name: author } = book;

            return (
            <Link to={`/books/${isbn ? isbn[0] : ''}`} key={key} className='book'>
                <article>
                <img src={isbn ? `https://covers.openlibrary.org/b/isbn/${isbn[0]}-M.jpg` : url } alt={title} />
                <div className='book-info'>
                    <h4 className='title'>{title}</h4>
                    <h4 className='title'>{author}</h4>
                    <p>{year ? year[0] : 'N/A'}</p>
                </div>
                </article>
            </Link>
            )
        })}
        </section>
    )
}

export default Books
