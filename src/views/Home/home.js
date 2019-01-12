import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ categories, isLoading, currentScore }) => (
  <section>
    <h1>Homepage</h1>
    {!isLoading // if true alors afficher categories link
      ? <div>
        {categories.map(category => (
          <ul>
            <li>
              <Link to={`/categories/${category.id}`} key={category.id}>
                {category.title}
              </Link>
            </li>
          </ul>
        ))}
      </div>
      : <div>Je load</div> // else j'affiche un loader
    }
    <div>Score actuel : {currentScore}</div>
  </section>
);

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      clues_count: PropTypes.number,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Home;
