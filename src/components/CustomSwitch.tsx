import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

interface ICustomSwitch {
  loading: boolean;
  value: boolean;
  onChange: () => void;
  label: string;
}
const CustomSwitch = (props: ICustomSwitch) => {
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          disabled={props.loading}
          control={
            <Switch
              color="primary"
              disabled={false}
              checked={props.value}
              onChange={props.onChange}
            />
          }
          label={props.label}
        />
      </FormGroup>
    </div>
  );
};

export default CustomSwitch;
