import { Search as SearchIcon } from "@mui/icons-material";
import {
  alpha,
  CircularProgress,
  InputBase,
  styled,
  Typography,
  Grid,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/combineReducers";
import { fetchTagsAction } from "../redux/actions/BlogActions";
import { v4 } from "uuid";
import { ITag } from "../types";

interface ITagPicker {
  values: any[];
  setFieldValue: (newValue: string[]) => void;
  disabled?: boolean;
}
const TagPicker = (props: ITagPicker) => {
  const [search, setSearch] = React.useState<string>("");
  const dispatch = useDispatch();
  const {
    loading,
    error,
    blog: tags,
  } = useSelector((state: RootState) => state.tags);
  const handleChange = (newValue: string) => {
    setSearch(newValue);
  };
  React.useEffect(() => {
    if (!loading && !error && !tags) {
      dispatch(fetchTagsAction());
    }
  }, [loading, error, tags, dispatch]);
  const filterTags = React.useMemo(() => {
    let temp = tags || [];
    if (search !== "") {
      return temp.filter((tag: ITag) =>
        tag.tag.toLowerCase().includes(search.toLowerCase())
      );
    }
    temp = temp.filter(
      (tag: ITag) => !props.values.includes(tag.tag.toLowerCase())
    );
    return temp;
  }, [search, tags, props.values]);
  const handleTagAdd = (tag: ITag) => {
    props.setFieldValue([...props.values, tag.tag]);
  };
  const handleTagRemove = (tag: string) => {
    props.setFieldValue(
      props.values.filter((t: string) => t.toLowerCase() !== tag)
    );
  };
  return (
    <div>
      <div className="flex flex-col gap-3 mt-1 text-center">
        <div>
          {loading && <CircularProgress size="20px" variant="indeterminate" />}
          {error && (
            <Typography variant="subtitle1" color={"red"}>
              {error}
            </Typography>
          )}
        </div>
        {tags && (
          <>
            <div>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="secondary" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={(e) => handleChange(e.target.value || "")}
                  disabled={props.disabled}
                />
              </Search>
            </div>
            <Divider />
            <div>
              <Grid container spacing={1}>
                {props.values.map((tag: string) => (
                  <Grid key={`key-${v4()}`} item>
                    <Chip
                      color="secondary"
                      key={`key-${v4()}`}
                      label={tag}
                      onDelete={() => handleTagRemove(tag)}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
            <Divider />
            <div style={{ minHeight: "100px" }}>
              <Grid container spacing={1}>
                {filterTags.map(
                  (tag: any, index: number) =>
                    index < 4 && (
                      <Grid key={`key-${v4()}`} item>
                        <Chip
                          color="primary"
                          key={`key-${v4()}`}
                          label={tag.tag}
                          onClick={() => handleTagAdd(tag)}
                        />
                      </Grid>
                    )
                )}
                {filterTags.length === 0 && search !== "" && (
                  <Grid item key={`key-${v4()}`}>
                    <Button
                      onClick={() =>
                        handleTagAdd({ tag: search, id: 1 } as ITag)
                      }
                      color="primary"
                      variant="text"
                      disabled={search === ""}
                    >
                      Add New Tag
                    </Button>
                  </Grid>
                )}
              </Grid>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "24px",
  backgroundColor: alpha(theme.palette.grey[500], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[700], 0.25),
  },
  "&:active": {
    backgroundColor: alpha(theme.palette.grey[700], 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export default TagPicker;
