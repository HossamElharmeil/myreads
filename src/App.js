import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Books from './Books'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    search: []
  }
  
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  handleSearch = async (event) => {
    try {
      const search = await BooksAPI.search(event.target.value)
        if (search.error) {
          return this.setState({ search: [] })
        }
        return this.setState((state) => ({
          search: search.map(book => {
            const index = state.books.findIndex(query => query.id === book.id)
            if (index !== -1) {
              return state.books[index]
            }
            else return book
          })
        }))
    }
    catch(_) {
      this.clearSearch()
    }
  }

  clearSearch = () => {
    this.setState({ search: [] })
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
        <SearchBooks changeShelf={this.changeShelf} clearSearch={this.clearSearch} books={this.state.search} handleSearch={this.handleSearch} />
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
