import React from 'react'

const Book = (props) => {
    const { title, authors, imageLinks: { thumbnail }} = props.book
    return (
        <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail ? thumbnail : ''})` }}></div>
                <div className="book-shelf-changer">
                    <select>
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