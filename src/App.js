import {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  //have a text box then add to end of url
  const fetchCocktailHandler = useCallback(() => {
    setLoading(true);
    axios.get(url+"Elderflower_cordial").then(res=>{
      console.log(res.data);
      setData(res.data.drinks);
    }).catch(e=>console.log(e))
    .finally(() => setLoading(false));
  }, [])

//.replace() for getting ingredients
//Autocomplete and Textfield from MUI to get input
  useEffect(() => {
    fetchCocktailHandler();
  }, [fetchCocktailHandler]);
  return (
    <div className="App">
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
