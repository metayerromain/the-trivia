import React, { Component } from 'react';

import Home from './home';

class HomeContainer extends Component {
  state = {
    categories: [],
    isLoading: true,
    score: 0
  }
  componentDidMount() {
    fetch('http://jservice.io/api/categories?count=10').then(response => {
      response.json().then(categories => {
        this.setState({
          categories: categories,
          isLoading: false,
        });
      });
    })

    //affichage du score
    let actualScore = localStorage.getItem('score');
    if(actualScore == null){
      this.setState({
        score : 0
      })
    } else {
      this.setState({
        score : actualScore
      })
    }

    //Gestion autre
    console.log(this.state.categories)
    localStorage.getItem('score')
  }

     
  render() {
    return (
      <Home
        categories={this.state.categories}
        isLoading={this.state.isLoading}
        currentScore={this.state.score}
      />
    );
  }
}

export default HomeContainer;