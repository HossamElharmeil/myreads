import React from 'react'

import Book from './Book'

const Books = (props) => {
    return (
        <div className="bookshelf">
            <ol className="books-grid">
                {props.books.map(book => (
                    <Book key={book.id} book={book} />
                ))}
            </ol>
        </div>
    )
}

export default Books