import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI  from './BooksAPI';
import Book from './book';
class Search extends Component {

    state ={
        books:[],
        error:false,
        query:''
    }
    change = (e)=>{
      if(!e.target.value){
        this.setState({
            books : [],
            error: true,
            query:''
          });
        return
      }
        this.setState({
            books : [],
            query:e.target.value
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
                books : items,
                error:false
              })
        }).catch((error)=>{
          this.setState({
                error:true
              })
        })
    }
    update = (data) =>{
        BooksAPI.update(data,data.target).then((data)=>{
            this.props.updateAPI();
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.change} value={this.state.query}/>
                    </div>
                </div>
                {this.state.error?(<h1 style={{ position:"relative",top:80,textAlign:"center"}}>There are no search results</h1>):(<hr/>)}
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.query!==''&&this.state.books.map((item) => {
                        let data= {key:item.key,image:item.image,title:item.title,author:item.author,shelf:"none"};
                        this.props.currentlyReading.forEach((book)=>{
                          if(book.key === item.key){
                            data.shelf = "currentlyReading";
                          }
                        });
                        this.props.wantToRead.forEach((book)=>{
                          if(book.key === item.key){
                            data.shelf = "wantToRead";
                          }
                        });
                        this.props.read.forEach((book)=>{
                          if(book.key === item.key){
                            data.shelf = "read";
                          }
                        });
              return (
                <Book key={data.key} data={data} handleChange={this.update}/>
              )
            })}
                    </ol>
                </div>
            </div>
        );

    }
}

export default Search;