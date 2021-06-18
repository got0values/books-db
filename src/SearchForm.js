import React from 'react'
import { useGlobalContext } from './context'
import {useState} from 'react'
const SearchForm = () => {
  const { query, setQuery, error } = useGlobalContext()
  const [text, setText]  = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    setQuery(text)
  }
  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <h3>search books</h3>
        <input
            type='text '
            className='form-input'
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <button type='submit' className='search-btn'>Submit</button>
      {error.show && <div className='error'>{error.msg}</div>}
    </form>
  )
}

export default SearchForm
