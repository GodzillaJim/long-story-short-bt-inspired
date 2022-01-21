import { TextField } from '@mui/material';
import React from 'react';

interface ICustomSearch {
  value: string;
  onChange: (newValue: string) => void;
}
const CustomSearchBar = (props: ICustomSearch) => {
  return (
    <div>
      <TextField
        variant="outlined"
        onChange={(e: any) => props.onChange(e.target.value)}
        value={props.value}
      />
    </div>
  );
};

export default CustomSearchBar;
