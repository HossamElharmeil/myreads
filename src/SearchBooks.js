import React from 'react'

import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Books from './Books'

const SearchBooks = (props) => {
    return (
        <Route path="/search">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'><button className="close-search" onClick={props.clearSearch}>Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(e) => props.handleSearch(e)} />

              </div>
            </div>
            <div className="search-books-results">
              <Books books={props.books} changeShelf={props.changeShelf} />
            </div>
          </div>
        </Route>
    )
}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    clearSearch: PropTypes.func.isRequired,
    changeShelf: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
}

export default SearchBooks