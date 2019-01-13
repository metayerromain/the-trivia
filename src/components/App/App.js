import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import HomeContainer from '../../views/Home/homeContainer';
import CategoryContainer from '../../views/Category/CategoryContainer';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/categories/:id" component={CategoryContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
