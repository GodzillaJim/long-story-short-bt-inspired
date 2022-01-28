import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { v4 } from "uuid";

interface IDataList {
  items: any[];
  headers: string[];
  label?: string;
  onRenderRow: (row: any, index: number) => JSX.Element;
}
const useStyles = makeStyles({
  headers: {
    fontFamily: "Source Sans Pro !important",
    fontWeight: "bold !important",
    width: "calc((100% - 48px) / 6)",
  },
});
const DataList = (props: IDataList) => {
  const { headers, items, label } = props;
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label={label || "simple data table"}>
          <TableHead>
            <TableRow>
              {headers.map((header: string) => (
                <TableCell className={classes.headers} key={`key-${v4()}`}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: any, index: number) =>
              props.onRenderRow(item, index)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataList;
