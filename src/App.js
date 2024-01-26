import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import AutocompleteInput from "./autocomplete";
import CocktailList from "./list";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const url = process.env.REACT_APP_URL;
  const getIngredients = useCallback(() => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
      .then((res) => setIngredients(res.data.drinks))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);
  const fetchCocktailHandler = useCallback((type) => {
    setLoading(true);
    axios
      .get(url + type)
      .then((res) => setData(res.data.drinks))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <AutocompleteInput
        options={ingredients}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          if (newValue) {
            console.log("not null");
            fetchCocktailHandler(newValue.strIngredient1);
          }
        }}
        inputValue={inputValue}
        onInputChange={(newInputValue) => {
          setInputValue(newInputValue);
          console.log(inputValue);
        }}
      />

      <CocktailList data={data} />
    </div>
  );
}

export default App;
