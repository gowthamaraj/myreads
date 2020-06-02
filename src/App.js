import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import BookApp from './bookapp';
import { Route, Switch } from 'react-router-dom';
import Search from './search';
import * as BooksAPI  from './BooksAPI';


class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  updateAPI= (e) =>{
    this.setState({
      currentlyReading: [],
      wantToRead: [],
      read: []
    })
    BooksAPI.getAll().then((data)=>{
      data.forEach((data)=>{
        const item ={
          image:data.imageLinks.thumbnail,
          title:data.title,
          author:data.authors[0],
          key:data.id
        }

        this.setState({
          [data.shelf] : [...this.state[data.shelf], item]
        })
      })
  })
  }
  componentDidMount(){
    this.updateAPI();
  }
  handleChange = (e) => {
    const data = JSON.parse(e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data"));
    const { image, title, author, key, shelf } = data;
    const target = e.target.value;
    const item = {
      image, title, author, key
    };
    BooksAPI.update(item,target).then((data)=>{
      console.log(data);
  });
    if (target !== shelf) {
      if (target === "none") {
        this.setState({
          [shelf]: this.state[shelf].filter((book) => {
            return book.key !== key;
          })
        })
        return
      }
      this.setState({
        [target]: [...this.state[target], item],
        [shelf]: this.state[shelf].filter((book) => {
          return book.key !== key;
        })
      })
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/" render={() => <BookApp currentlyReading={this.state.currentlyReading} wantToRead={this.state.wantToRead} read={this.state.read} handleChange={this.handleChange} />} exact />
        <Route path="/search" render={() => <Search updateAPI={this.updateAPI}/>} />
      </Switch>
    )
  }
}

export default BooksApp
