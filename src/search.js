import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI  from './BooksAPI';
class Search extends Component {

    state ={
        books:[]
    }
    change = (e)=>{ 
        this.setState({
            books : []
          });
        BooksAPI.search(e.target.value).then((data)=>{
            let items =[]
            data.forEach((data)=>{
                if(data.imageLinks && data.authors){
                    const item ={
                        image:data.imageLinks.smallThumbnail,
                        title:data.title,
                        author:data.authors[0],
                        key:data.id
                      }
                      items = [...items,item];
                }
              })
              this.setState({
                books : items
              })
        }).catch((error)=>{
            console.log(error);
        })
    }
    update = (e) =>{
        const data = JSON.parse(e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data"));
        BooksAPI.update(data,e.target.value).then((data)=>{
            this.props.updateAPI();
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.change} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.books.map((item) => {
                        let data= {key:item.key,image:item.image,title:item.title,author:item.author,shelf:"new"};
                        data = JSON.stringify(data);
              return (
                <li key={Math.random()} data={data}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.image})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={this.update} defaultValue="move">
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
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
        );

    }
}

export default Search;