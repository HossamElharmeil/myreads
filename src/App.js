import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Books from './Books'
import { Route } from 'react-router'
import { Link, Redirect } from 'react-router-dom'

class BooksApp extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
        return this.setState(() => ({ search }))
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
      else if (index === -1 && shelf !== 'none') 
        state.books.push(book)
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
