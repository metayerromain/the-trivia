import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ score, lifeRemain, categoryName, categoryClues, onClickChange, onValueChange, errorDisplay, onReset}) => (
  <section>
    <header className="header">
      <a href="../">
        <div className="header--logo">
          <img className="header--image" src="https://svgur.com/i/AUv.svg"/>
          <h1 className="header--title">Cookie<span className="header--titleSecondary">Quiz</span></h1>
        </div>
      </a>
    </header>
    <section className="question">
    <a className="question--back" href="../">Retour à l'accueil</a>
    <h2 className="question--category">{categoryName}</h2>
    <h3 className="question--life">Il te reste <span className="question--lifeBold">{lifeRemain}</span> vie(s).</h3>
    <h3 className="question--score">{score}/5</h3>
    <p className="question--text">{categoryClues}</p>
      <form className="question--form">
        <input className="inputForm" type="text" placeholder="Entrez votre réponse..." onChange={onValueChange} />
        <button className="submit" type="submit" onClick={onClickChange}><p>Confirmer</p></button>
      </form>
      <button className="reset" onClick={onReset}>Réinitialiser le score</button>
      <p className="error">{errorDisplay}</p>
      </section>
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default Category;
