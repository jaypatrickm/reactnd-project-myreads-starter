import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import AddBook from './AddBook'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    allBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ shelvedBooks: books })
    })
  }

  updateBook = (book, newShelf) => {
    let addBook = book;
    BooksAPI.update(book, newShelf).then((data) => {


        let index = this.state.shelvedBooks.findIndex(x=> x.id === book.id);
        console.log(index)
        console.log(this.state.allBooks.filter((b) => b.id !== book.id))
        let newAllBooks = this.state.allBooks.filter((b) => b.id !== book.id);
        console.log(this.state.shelvedBooks)
        console.log(this.state.shelvedBooks.concat([Object.assign({}, addBook, {shelf : newShelf })]))
        if(index === -1) {
          this.setState(prevState => ({
            shelvedBooks:  prevState.shelvedBooks.concat([Object.assign({}, addBook, {shelf : newShelf })]),
            allBooks: newAllBooks
          }))
       
        }
        else 
        {
          this.setState({
            shelvedBooks: [
              ...this.state.shelvedBooks.slice(0, index),
              Object.assign({}, this.state.shelvedBooks[index], {shelf : newShelf }),
              ...this.state.shelvedBooks.slice(index+1)
            ]
          })
        }
    });
  }

  searchBooks = (query) => {
    if(query !== '') {
      let shelvedIds = this.state.shelvedBooks.map(b => b.id)
      console.log(shelvedIds)


      BooksAPI.search(query).then((books) => {

        let newBooks = books.filter(b => !shelvedIds.includes(b.id));
        console.log(newBooks)
        this.setState({ allBooks: newBooks })
      })
    }
    
  }

  render() {
    return (
      <div className='app'>

        <Route exact path='/' render={() => (
          <ListBooks
           shelvedBooks={this.state.shelvedBooks}
           onUpdateBook={(book,shelf) => { 
            this.updateBook(book,shelf)
           }} 
           />
          
        )}/>
          
        
        <Route path='/search' render={() => (
          <AddBook
            allBooks={this.state.allBooks}
            query={this.state.query}
            onUpdateBook={(book,shelf) => { 
            this.updateBook(book,shelf)
            }}
            onSearchBooks={(query) => {
              this.searchBooks(query)
            }} 
           />
        )}/>
        
          
        
      </div>
    )
  }
}

export default BooksApp
