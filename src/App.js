import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AddBook from './AddBook'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks
           books={this.state.books} />
          
        )}/>
          
        
        <Route path='/search' render={() => (
          <AddBook />
        )}/>
        
          
        
      </div>
    )
  }
}

export default BooksApp
