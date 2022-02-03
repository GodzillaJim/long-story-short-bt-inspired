import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { alpha, InputBase, styled, Theme, useTheme } from "@mui/material";

interface ICustomSearchBox {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  maxWidth?: string;
  color?: "primary" | "secondary";
  placeholder?: string;
}
const CustomSearchBox = (props: ICustomSearchBox) => {
  const theme = useTheme();
  return (
    <div className="custom-search-box-container">
      <Search
        className="mx-auto"
        theme={theme}
        maxWidth={props.maxWidth || "100%"}
      >
        <SearchIconWrapper>
          <SearchIcon color={props.color || "secondary"} fontSize="small" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder={props.placeholder || "Search…"}
          inputProps={{ "aria-label": "search" }}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value || "")}
          disabled={props.disabled}
          maxWidth={props.maxWidth || "100%"}
          theme={theme}
        />
      </Search>
    </div>
  );
};

const StyledInputBase = styled(InputBase)(
  ({ theme, maxWidth }: { theme: Theme; maxWidth: string }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(0.5, 1, 0.5, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2)})`,
      transition: theme.transitions.create("width"),
      width: `calc(0.86 * ${maxWidth})` || "100%",
      [theme.breakpoints.down("md")]: {
        width: "20ch",
      },
      height: "24px",
      fontSize: "12px",
    },
  })
);
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Search = styled("div")(
  ({
    theme,
    maxWidth,
    className,
  }: {
    theme: Theme;
    maxWidth: string;
    className: string;
  }) => ({
    margin: "auto",
    position: "relative",
    borderRadius: "24px",
    backgroundColor: alpha(theme.palette.grey[500], 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.grey[700], 0.25),
    },
    "&:active": {
      backgroundColor: alpha(theme.palette.grey[700], 0.25),
    },
    marginLeft: 0,
    width: "100%",
    maxWidth: maxWidth || "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  })
);
export default CustomSearchBox;
