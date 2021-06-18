import React from 'react'
import { useGlobalContext } from './context'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'

const url =
  '/256px-No_image_available.svg.png'


const Books = () => {
    const { data, isLoading, page, setPage, books, setBooks } = useGlobalContext()

    //define the nextPage function. If it gets to the end, set the next page to 0
    const nextPage = () => {
        setPage((oldPage) => {
        let nextPage = oldPage + 1
        if (nextPage > data.length - 1) {
            nextPage = 0
        }
        return nextPage
        })
    }
    //define the prevPage function. If it gets to under 0, set the previous page to the last page
    const prevPage = () => {
        setPage((oldPage) => {
        let prevPage = oldPage - 1
        if (prevPage < 0) {
            prevPage = data.length - 1
        }
        return prevPage
        })
    }
    //define the handlePage function for the numbered buttons. Set the page to the value
    const handlePage = (index) => {
        setPage(index)
    }

    useEffect(() => {
        data && setBooks(data[page])  
    }, [page, isLoading])

    if (isLoading) {
        return <div className='loading'></div>
    }

    return (
        <section className='books'>
            <div className='container'>
        {!isLoading && books ? books.map((book) => {
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
        }) : ''}
            </div>

        
        { !isLoading && books ?
            <div className='btn-container'>
                <button className='prev-btn' onClick={prevPage}>
                prev
                </button>
                {data.map((item, index) => {
            return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                    {index + 1}
                </button>
              )
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        : ''}
        </section>
    )
}

export default Books
