import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import localSto from '../../helpers/json';
import { api } from '../../helpers/api';
import Category from './Category';


class CategoryContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      actualLink: props.match.params.id,
      category: null,
      count: 0,
      value: null,
      life: 3,
      errorDom: "",
      score: 0,
      question: ""
    } 
  }

  async componentDidMount() {
    console.log(this)
    const data = await api.getCategoryById(this.props.match.params.id);
    this.setState({
      category: data,
    });
    let local = localSto.getLocalStorageItem('category-'+this.state.actualLink);
    local = JSON.parse(local);
    if(local !== null){
      this.setState({
        score: local[0],
        count: local[1],
        life: local[2]
      })
    }
  }

  setAllScore = (removeScore) => {
    let actualScore = localStorage.getItem('score');
    let score;
    if(removeScore){
      score = actualScore - removeScore;
    } else {
      if(actualScore == null){
        actualScore = 0;
      } else{
        // nothing 
      }
      score = parseInt(actualScore) + 1;
    }
    localStorage.setItem('score', score);
  }

  handleClick = (e) => {
    e.preventDefault();
    let {value, count, category , score, life} = this.state;

    if(value === category.clues[count].answer){
      document.querySelector('.inputForm').value="";
      if(count < category.clues.length){
        var activeCount = count + parseInt(1);
        var activeScore = score + parseInt(1);
        this.setState({
          errorDom:"",
          score: score + 1,
        })
        //Rempli le localstorage avec le [score, compte, vie]
        var toSave = [activeScore, activeCount, life];
        localSto.setLocalStorageItem('category-'+category.id, JSON.stringify(toSave));
        this.setAllScore();
      } else {
        //si on arrive a la fin des questions on arrete d'avancer
        return false;
      }
    } else {
        //set le score avec le score precedant pour pas peter une erreur
        activeCount = count;
        this.setState({
          errorDom: "mauvaise réponse",
          life: life-1,
        })
        //recrée le tableau dans le localstorage avec la vie en dernier element du tableau
        localSto.page(this.state.actualLink, life, category);
      }
      this.setState({
        count: activeCount,
      })
    }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  reset = () => {
    this.setState({
      score : 0,
      count: 0,
    })
    var removeScore = localStorage.getItem('category-'+this.state.actualLink);
    if (removeScore === 0 || removeScore === null){
      return false;
    } else {
      removeScore = removeScore.split(',')[0];
      removeScore = removeScore.split('[')[1];
      localSto.removeLocalStorageItem('category-'+this.state.actualLink);
      this.setAllScore(removeScore);
    }
  }

  render() {
    const {life, score, category, count, errorDom} = this.state;
    if(!this.state.category){
      return(
        <div>Waiting...</div>
      )
    }
    else if(life === 0 || life < 1) {
      return(
        <div className="container-lose">
          <header className="header">
            <a href="../">
              <div className="header--logo">
                <img className="header--image" src="https://svgur.com/i/AUv.svg"/>
                <h1 className="header--title">Cookie<span className="header--titleSecondary">Quiz</span></h1>
              </div>
            </a>
          </header>
          <div className="lose">
            <h2 className="lose--text">Game Over !</h2>
            <a href="../"><div className="lose--back">Retour à l'accueil</div></a>
          </div>
        </div>
      )
    } else {
      if(category.clues[count] === undefined){
        return (
          <div className="container-win">
            <header className="header">
              <a href="../">
                <div className="header--logo">
                  <img className="header--image" src="https://svgur.com/i/AUv.svg"/>
                  <h1 className="header--title">Cookie<span className="header--titleSecondary">Quiz</span></h1>
                </div>
              </a>
            </header>
            <div className="win">
              <h3 className="win--score">{score}/5</h3>
              <h2 className="win--text">Félicitations, vous avez gagné <span className="win--textBold">{score}</span> cookies ! 😍</h2>
              <a href="../"><div className="win--back">Retour à l'accueil</div></a>
            </div>
          </div>
        )
      }
      return (
        <Category
            lifeRemain = {life}
            score = {score}
            categoryName={category.title}
            categoryClues={category.clues[count].question}
            onClickChange = {this.handleClick}
            onValueChange = {this.handleChange}
            errorDisplay = {errorDom}
            onReset = {this.reset} 
        />            
      )
    }
  }
}

export default withRouter(CategoryContainer);