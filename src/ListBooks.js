import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
 
class ListBooks extends Component {
	render() {
	  const { shelvedBooks, onUpdateBook } = this.props
    let currentlyReading = shelvedBooks.filter(book => book.shelf === 'currentlyReading');
    let wantToRead = shelvedBooks.filter(book => book.shelf === 'wantToRead');
    let read = shelvedBooks.filter(book => book.shelf === 'read');
		return (
			<div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
          	<Bookshelf
          		shelfTitle='Currently Reading'
          		shelf='currentlyReading'
          		books={currentlyReading}
          		onUpdateBook={onUpdateBook}
          	/>
            <Bookshelf
        			shelfTitle='Want to Read'
          		shelf='wantToRead'
          		books={wantToRead}
          		onUpdateBook={onUpdateBook}
        	  />
		        <Bookshelf
  			      shelfTitle='Read'
          		shelf='read'
          		books={read}
          		onUpdateBook={onUpdateBook}
        	  />
          </div>
        </div>
        <div className='open-search'>
        	 <Link className='open-search' to='/search'>Add a book</Link>
        </div>
      </div>
		)
	}
}

export default ListBooks