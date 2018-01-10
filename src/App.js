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

  updateBook = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => {
        let index = this.state.books.findIndex(x=> x.id === book.id);
        if(index === -1) {

        }
        else 
        {
          this.setState({
            books: [
              ...this.state.books.slice(0, index),
              Object.assign({}, this.state.books[index], {shelf : newShelf }),
              ...this.state.books.slice(index+1)
            ]
          })
        }
    });
  

  }

  render() {
    return (
      <div className='app'>

        <Route exact path='/' render={({history}) => (
          <ListBooks
           books={this.state.books}
           onUpdateBook={(book,shelf) => { 
            this.updateBook(book,shelf)
            history.push('/')
           }} 
           />
          
        )}/>
          
        
        <Route path='/search' render={() => (
          <AddBook />
        )}/>
        
          
        
      </div>
    )
  }
}

export default BooksApp
