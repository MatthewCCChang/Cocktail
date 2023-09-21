import {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button } from '@mui/material';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [ingredients3, setIngredients] = useState([]);
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  const getIngredients = useCallback(() => {
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list").then(res=>{
      setIngredients(res.data.drinks);
    }).catch(e => console.log(e))
  }, [])
  console.log(ingredients3);
  var counter =-1;
  const modified_ingredients = ingredients3.map(drink => {
    counter++;
    if(drink.strIngredient1.includes(" ")){
      return {strIngredient1: drink.strIngredient1.replaceAll(" ", "_"), id:{counter} }
    }
    return {...drink, id: {counter}}
  })
  console.log(modified_ingredients);

  const ingredients = [{name: "Gin", id: 1},{name: "Elderflower_cordial", id: 2}];

  const [value, setValue] = useState(modified_ingredients[0]);
  const [inputValue, setInputValue] = useState('');

  
  //have a text box then add to end of url
  const fetchCocktailHandler = useCallback((type) => {
    setLoading(true);
    axios.get(url+type).then(res=>{
    console.log(res.data);
    setData(res.data.drinks);
    }).catch(e=>console.log(e))
    .finally(() => setLoading(false));
}, [])

//.replace() for getting ingredients
//Autocomplete and Textfield from MUI to get input
  useEffect(() => {
    getIngredients();
    fetchCocktailHandler("Gin");
  }, [fetchCocktailHandler, getIngredients]);
  return (
    <div className="App">
      <Autocomplete 
        sx={{width:300, margin: 5, mx: 'auto'}}
        autoHighlight
        options = {modified_ingredients}
        getOptionLabel={option => (option.strIngredient1)}
        renderInput={(params) => (
          <TextField 
            {...params}
            label = "Choose an ingredient"
            inputProps={{...params.inputProps, autoComplete: "new-password",}}
          />
        )}
        isOptionEqualToValue={(option, value) => option.strIngredient1===value.strIngredient1}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          
          if(newValue){
            console.log("not null")
            fetchCocktailHandler(newValue.strIngredient1)
          }
          
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
          console.log(inputValue)
        }}
      />
      {data.map((cocktail => (
        <div key={cocktail.idDrink}>
          <h2>{cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt="#"/>
        </div>
      )))}
    </div>
  );

}

export default App;
