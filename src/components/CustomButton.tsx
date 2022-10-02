import { Button, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  button: {
    "&:focus": {
      outline: "none",
    },
  },
});
const CustomButton = (props: ButtonProps) => {
  const classes = useStyles();
  return (
    <div>
      <Button className={classes.button} {...props} />
    </div>
  );
};

export default CustomButton;
