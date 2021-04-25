import React from 'react'

import Book from './Book'
import PropTypes from 'prop-types'

const Books = ({ books, changeShelf, shelf }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
            <div className="bookshelf">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book key={book.id} book={book} changeShelf={changeShelf} />
                    ))}
                </ol>
            </div>
        </div>
    </div>   
)

Books.propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func
}

export default Books