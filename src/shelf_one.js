import React, { Component } from 'react';

class Shelf extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.currentlyReading.map((item) => {
                        let data= {key:item.key,image:item.image,title:item.title,author:item.author,shelf:"currentlyReading"};
                        data = JSON.stringify(data);
              return (
                <li key={item.key} data={data}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.image})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={this.props.handleChange} defaultValue="currentlyReading">
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{item.title}</div>
                    <div className="book-authors">{item.author}</div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf;