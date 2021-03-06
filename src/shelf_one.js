import React, { Component } from 'react';
import Book from './book';
class Shelf extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.currentlyReading.map((item) => {
                        let data= {key:item.key,image:item.image,title:item.title,author:item.author,shelf:"currentlyReading"};
              return (
                <Book key={data.key} data={data} handleChange={this.props.handleChange}/>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf;