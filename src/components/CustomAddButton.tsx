import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

interface ICustomAddButton {
  text: string;
  onClick: () => void;
}
const CustomAddButton = (props: ICustomAddButton) => {
  return (
    <div>
      <Button onClick={props.onClick} variant="outlined" startIcon={<Add />}>
        {props.text}
      </Button>
    </div>
  );
};

export default CustomAddButton;
