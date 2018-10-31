import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ categoryName, categoryQuestion, categoryClues, onClickChange, onValueChange}) => (
  <section>
    <h1>Category: {categoryName}</h1>
      <br/> 
      <div>
          {categoryQuestion}
          <br></br>
          {categoryClues}
      </div>
      <input type="text" onChange={onValueChange} />
      <button onClick={onClickChange}>Next</button>
  </section>
);

Category.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default Category;