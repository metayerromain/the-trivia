import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ categories, isLoading, currentScore }) => (
  <section>
    <header className="header">
      <a href="../">
        <div className="header--logo">
          <img className="header--image" src="https://svgur.com/i/AUv.svg"/>
          <h1 className="header--title">Cookie<span className="header--titleSecondary">Quiz</span></h1>
        </div>
      </a>
    </header>
    {!isLoading // if true alors afficher categories link
      ? <section className="categories">
        {categories.map(category => (
          <ul className="categories--container">
            <li className="categories--box">
              <h2 className="categories--boxTitle">{category.title}</h2>
              <Link to={`/categories/${category.id}`} key={category.id}>
                <button className="categories--button"><p className="categories--buttonText">Jouer au quiz</p></button>
              </Link>
            </li>
          </ul>
        ))}
      </section>
      : <div>Je load</div> // else j'affiche un loader
    }
    <footer className="footer">
    <div className="footer--counter">
    <img className="footer--counterIcon" src="https://svgur.com/i/AUd.svg"/>
    <p className="footer--counterText">Tu as <span className="footer--counterTextSecondary">{currentScore}</span> cookie(s)</p>
    </div>
    </footer>
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
