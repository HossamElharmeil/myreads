import React from 'react'
import { update } from './BooksAPI'

const Book = (props) => {
    const { book, book: { title, authors, shelf } } = props
    let thumbnail = ''
    try {
        thumbnail = props.book.imageLinks.thumbnail
    } catch (error) {
        thumbnail = ''
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => props.changeShelf(book, event.target.value)} value={shelf || "none"}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
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