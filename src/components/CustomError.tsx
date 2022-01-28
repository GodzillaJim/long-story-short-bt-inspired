import React from "react";
import { Typography, Button } from "@mui/material";

interface ICustomError {
  message: string;
  onClick: () => void;
}
const CustomError = (props: ICustomError) => {
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <Typography color="red" variant="h6">
            {props.message}
          </Typography>
        </div>
        <div>
          <Button onClick={props.onClick} color="error" variant="text">
            RETRY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomError;
