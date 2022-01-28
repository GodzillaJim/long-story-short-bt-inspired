import {
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import React from "react";

interface ICustomCheckbox {
  color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "default";
  disabled: boolean;
  checked: boolean;
  onChange: () => void;
  label: string;
}
const CustomCheckbox = (props: ICustomCheckbox) => {
  return (
    <div>
      <FormGroup>
        <FormControlLabel label={props.label} control={<Switch {...props} />} />
      </FormGroup>
    </div>
  );
};

export default CustomCheckbox;
