import React from 'react';
import './card.css';

const CocktailCard = ({ cocktail }) => (
  <div className="cocktail-card">
    <h2>{cocktail.strDrink}</h2>
    <img src={cocktail.strDrinkThumb+"/preview"} alt="#" />
  </div>
);

export default CocktailCard;
