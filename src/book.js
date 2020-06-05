import React, { Component } from 'react';

class Book extends Component{
    state = {
        data:this.props.data
    }

    handleChange = (e)=>{
        let data = this.state.data;
        data.target = e.target.value;
        this.setState(
            {
                data
            }
        )
        this.props.handleChange(this.state.data)
    }
    render(){
        return (
            <li key={this.state.data.key}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.state.data.image})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={this.handleChange} defaultValue={this.state.data.shelf}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{this.state.data.title}</div>
                    <div className="book-authors">{this.state.data.author}</div>
                  </div>
                </li>
        )
    }
}

export default Book