import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "12px !important",
  },
}));

export const tableStyles = makeStyles((theme) => ({
  cell: {
    padding: "4px",
  },
}));

export const cellStyle = {
  fontFamily: "Sans Serif",
  width: "calc((100% - 96px) / 5)",
  padding: 0,
  fontSize: "12px",
  overflow: "hidden",
};