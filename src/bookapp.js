import React from 'react';
import ShelfOne from './shelf_one';
import ShelfTwo from './shelf_two';
import ShelfThree from './shelf_three';
import {Link} from 'react-router-dom';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfOne currentlyReading={this.props.currentlyReading} handleChange={this.props.handleChange}/>
                <ShelfTwo wantToRead={this.props.wantToRead} handleChange={this.props.handleChange}/>
                <ShelfThree read={this.props.read} handleChange={this.props.handleChange}/>
              </div>
            </div>
            <div className="open-search">
            <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
