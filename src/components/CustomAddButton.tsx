import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import "./CustomAddButton.css";

interface ICustomAddButton {
  text: string;
  onClick: () => void;
}
const CustomAddButton = (props: ICustomAddButton) => {
  return (
    <div>
      <Button
        className="custom-button"
        onClick={props.onClick}
        variant="outlined"
        startIcon={<Add />}
      >
        {props.text}
      </Button>
    </div>
  );
};

export default CustomAddButton;
