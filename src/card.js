import React from 'react';
import './card.css';
import { Button } from '@mui/material';

const CocktailCard = ({ cocktail }) => (
  <div className="cocktail-card">
    <h2>{cocktail.strDrink}</h2>
    <Button><img src={cocktail.strDrinkThumb+"/preview"} alt="#" /></Button>
  </div>
);

export default CocktailCard;
