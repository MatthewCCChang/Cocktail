import React from 'react';
import CocktailCard from './card';
import './list.css';

const CocktailList = ({ data }) => (
    <div className="cocktail-list">
    {data.map((cocktail) => (
      <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
    ))}
  </div>
);

export default CocktailList;
