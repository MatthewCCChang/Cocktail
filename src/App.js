import {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button } from '@mui/material';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  const ingredients = [{name: "Gin", id: 1},{name: "Elderflower_cordial", id: 2}];

  const [value, setValue] = useState(ingredients[0]);
  const [inputValue, setInputValue] = useState('');

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
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
    fetchCocktailHandler("Gin");
  }, [fetchCocktailHandler]);
  return (
    <div className="App">
      <Autocomplete 
        sx={{width:300, margin: 5, mx: 'auto'}}
        autoHighlight
        options = {ingredients}
        getOptionLabel={option => (option.name)}
        renderInput={(params) => (
          <TextField 
            {...params}
            label = "Choose an ingredient"
            inputProps={{...params.inputProps, autoComplete: "new-password",}}
          />
        )}
        isOptionEqualToValue={(option, value) => option.name===value.name}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          
          if(newValue){
            console.log("not null")
            fetchCocktailHandler(newValue.name)
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
