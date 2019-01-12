import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ score, lifeRemain, categoryName, categoryClues, onClickChange, onValueChange, errorDisplay, onReset}) => (
  <section>
    <h1>Category: {categoryName}</h1>
      <br/> 
      <div>
          <br></br>
         <div>{categoryClues}</div> 
      </div>
      <h3>vies : {lifeRemain}</h3>
      <h3>score : {score}</h3>
      <form>
        <input className="inputForm" type="text" onChange={onValueChange} />
        <button className="submit" type="submit" onClick={onClickChange}>Next</button>
      </form>
      <button onClick={onReset}>Reset score</button>
      <p>{errorDisplay}</p> 
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default Category;