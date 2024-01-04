import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteInput = ({ options, value, onChange, inputValue, onInputChange }) => (
  <Autocomplete 
    autoHighlight
    options={options}
    getOptionLabel={(option) => option.strIngredient1}
    renderInput={(params) => (
      <TextField 
        {...params}
        label="Choose an ingredient"
        inputProps={{ ...params.inputProps, autoComplete: "new-password" }}
      />
    )}
    isOptionEqualToValue={(option, selectedValue) => option.strIngredient1 === selectedValue.strIngredient1}
    value={value}
    onChange={(event, newValue) => {
      onChange(newValue);

      if (newValue) {
        console.log("not null");
        // Add logic here if needed when the Autocomplete value changes
      }
    }}
    inputValue={inputValue}
    onInputChange={(event, newInputValue) => {
      onInputChange(newInputValue);
      console.log(newInputValue);
    }}
  />
);

export default AutocompleteInput;
