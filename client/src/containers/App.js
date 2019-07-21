import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Posts from './Posts';
import Header from '../components/Header';
import Post from './Post';
import Footer from '../components/Footer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <Router>
          <Route exact path="/" component={Posts} />
          <Route exact path="/:slug" component={Post} />
        </Router>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
