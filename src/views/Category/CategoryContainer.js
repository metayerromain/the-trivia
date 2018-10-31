import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../../helpers/api';
import Category from './Category';

class CategoryContainer extends Component {
  state = {
    category: null,
    count:0,
    value: null,
    error: false,
    life:3,
  }
  async componentDidMount() {
    const data = await api.getCategoryById(this.props.match.params.id);
    this.setState({
      category: data,
    });
  }

  errorDisplay = () => {
    console.log('prout')
      return (
        <div>Mauvaise réponse</div>
      )
  }



handleClick = () => {
  console.log(this.state.category.clues[this.state.count].answer);

  if(this.state.value === this.state.category.clues[this.state.count].answer){
    if(this.state.count < this.state.category.clues.length-1){
      var activeCount = this.state.count+1;
      console.log(activeCount);
    } else {
      return false;
    }
  } else {
    this.setState({
      error: true,
    })
    // console.log(this.state.error);
    console.log(this);
    this.errorDisplay();
  }

  this.setState({
    count: activeCount,
  })
}

handleChange = (event) => {
  this.setState({value: event.target.value});
}

  render() {
    if(!this.state.category){
       return(
           <div>Waiting...</div>
       )
     } else {
      var questions = this.state.category.clues.map((question, i) => {
          if(this.state.count === i){
            return <div key={i} data-id={i}>{question.question}</div>
          } else {
            return false;
          }
        }  
      );
         return (
          <div>
            <Category
                categoryName={this.state.category.title}
                categoryQuestion={this.state.category.id}
                categoryClues={questions}
                onClickChange = {this.handleClick}
                onValueChange = {this.handleChange}
                errorDisplay = {this.errorDisplay}
            />
          </div>
        )
     }
  }
}

export default withRouter(CategoryContainer);