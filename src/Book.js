import React from 'react'
import { update } from './BooksAPI'

const Book = (props) => {
    const { book, book: { title, authors, shelf, imageLinks: { thumbnail } } } = props
    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail ? thumbnail : ''})` }}></div>
                <div className="book-shelf-changer">
                        <select onChange={(event) => props.changeShelf(book, event.target.value)} value="move">
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading" hidden={shelf === "currentlyReading"}>Currently Reading</option>
                        <option value="wantToRead" hidden={shelf === "wantToRead"}>Want to Read</option>
                        <option value="read" hidden={shelf === "read"}>Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{title ? title : ''}</div>
                <div className="book-authors">{authors ? authors.join(', ') : ''}</div>
            </div>
        </li>
    )
}

export default Book