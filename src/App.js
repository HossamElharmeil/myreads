import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Books from './Books'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    search: []
  }
  
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({ books }))
    })
  }

  handleSearch(event) {
    BooksAPI.search(event.target.value)
      .then(search => {
        if (search.error) {
          return this.setState(() => ({ search: [] }))
        }
        return this.setState((state) => ({
          search: search.map(book => {
            const index = state.books.findIndex(query => query.id === book.id)
            if (index !== -1) {
              return state.books[index]
            }
            else return book
        }) }))
      })
      .catch(_ => this.setState(() => ({ search: [] })))
  }

  changeShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf)
      
    this.setState((state) => {
      const index = state.books.findIndex(query => query.id === book.id)

      if (shelf === 'none' && index !== -1) {
        state.books.splice(index, 1)
      }
      else if (index === -1 && shelf !== 'none') {
        book.shelf = shelf
        state.books.push(book)
      }
      else
        state.books[index].shelf = shelf
      
      return state  
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route path="/search">
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleSearch(e)}/>

              </div>
            </div>
            <div className="search-books-results">
              <Books books={this.state.search} changeShelf={this.changeShelf} />
            </div>
          </div>
        </Route>
        <Route exact path='/'>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <Books books={this.state.books.filter(book => book.shelf === "currentlyReading")} changeShelf={this.changeShelf} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <Books books={this.state.books.filter(book => book.shelf === "wantToRead")} changeShelf={this.changeShelf} />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <Books books={this.state.books.filter(book => book.shelf === "read")} changeShelf={this.changeShelf}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
          </div>
        </Route>
      </div>
    )
  }
}

export default BooksApp
