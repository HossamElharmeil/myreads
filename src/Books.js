import React from 'react'

import Book from './Book'

const Books = (props) => {
    return (
        <div className="bookshelf">
            <ol className="books-grid">
                {props.books.map(book => (
                    <Book key={book.id} title={book.title} author={book.author} thumbnail={book.imageLinks.thumbnail} />
                ))}
            </ol>
        </div>
    )
}

export default Books