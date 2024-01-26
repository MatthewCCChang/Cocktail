import React, { useState } from "react";
import { Button, Modal, Box, Typography, createTheme } from "@mui/material";
import axios from "axios";

const url = process.env.REACT_APP_RECIPE_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  typography: {
    poster: {
      fontSize: "4rem",
    },
    // Disable h2 variant
    h2: undefined,
  },
});

const CocktailCard = ({ cocktail }) => {
  const [open, setOpen] = React.useState(false);
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState([]);

  const handleOpen = () => {
    displayRecipe(cocktail);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const displayRecipe = (cocktail) => {
    if (cocktail) {
      axios
        .get(url + cocktail.idDrink)
        .then((res) => {
          console.log(res);
          const newRecipe = res.data.drinks[0];
          setRecipe(newRecipe);

          let ing = [];
          for (let i = 1; i <= 15; i++) {
            const ingredient = newRecipe && newRecipe[`strIngredient${i}`];
            const amount = newRecipe && newRecipe[`strMeasure${i}`];

            if (ingredient && amount) {
              ing.push(
                <Typography
                  key={i}
                  id="modal-recipe-description"
                  variant="poster"
                  component="h2"
                >
                  {amount} {ingredient}
                </Typography>
              );
            }
          }
          setIngredients(ing);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("hi");
    }
  };

  return (
    <div className="cocktail-card">
      <h2>{cocktail.strDrink}</h2>
      <Button onClick={handleOpen} name={cocktail.id}>
        <img src={cocktail.strDrinkThumb + "/preview"} alt="#" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-recipel-title"
        aria-describedby="modal-recipe-description"
      >
        <Box sx={style}>
          <Typography id="modal-recipe-title" variant="h6" component="h2">
            {cocktail.strDrink}
          </Typography>
          {ingredients}
        </Box>
      </Modal>
    </div>
  );
};

export default CocktailCard;
