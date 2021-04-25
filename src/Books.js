import React from 'react'

import Book from './Book'
import PropTypes from 'prop-types'

const Books = (props) => {
    const { books, changeShelf } = props
    return (
        <div className="bookshelf">
            <ol className="books-grid">
                {books.map(book => (
                    <Book key={book.id} book={book} changeShelf={changeShelf} />
                ))}
            </ol>
        </div>
    )
}

Books.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func
}

export default Books