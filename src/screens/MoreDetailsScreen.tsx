import { Search as SearchIcon } from "@mui/icons-material";
import {
  alpha,
  Chip,
  Divider,
  Grid,
  InputBase,
  styled,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import { ITags } from "../data/Articles";
import { getNoneStopWords } from "../helpers/Language";
import { ITag } from "../types";
import { RootState } from "../redux/combineReducers";
import CustomError from "../components/CustomError";
import { fetchTagsAction } from "../redux/actions/BlogActions";

interface IProps {
  values: any;
  setFieldValue: (field: string, newValue: any) => void;
  loading: boolean;
}
const useStyles = makeStyles({
  tagsContainer: {
    minHeight: "300px",
    width: "100%",
    border: "1px solid rgba(0,0,0,0.1)",
  },
});
const MoreDetailsScreen = (props: IProps) => {
  const { values, setFieldValue } = props;
  const [search, setSearch] = useState<string>("");
  const dispatch = useDispatch();

  const classes = useStyles();
  const {
    loading,
    error,
    blog: allTags,
  } = useSelector((state: RootState) => state.tags);
  const handleRemoveTag = (tag: ITag) => {
    const newTags = values.tags.filter(
      (t: ITag) => t.tag.toLowerCase() !== tag.tag.toLowerCase()
    );
    setFieldValue("tags", newTags);
  };
  useEffect(() => {
    if (!loading && !error && !allTags) {
      dispatch(fetchTagsAction());
    }
  }, [loading, error, allTags, dispatch]);
  const handleSelectTag = (tag: ITags) => {
    const newTags = values.tags.filter(
      (t: ITags) => t.tag.toLowerCase() !== tag.tag.toLowerCase()
    );
    setFieldValue("tags", [...newTags, tag]);
  };
  const handleReloadTags = () => {
    dispatch(fetchTagsAction());
  };
  const tags = useMemo(() => {
    if (!allTags) {
      return [];
    }
    let temp = allTags;
    const title: string = values.title;
    if (title !== "") {
      const nonStopTags: ITag[] = getNoneStopWords(title).map(
        (word: string) => ({ tag: word, id: 1 } as ITag)
      );
      temp = [...temp, ...nonStopTags];
    }
    if (search !== "") {
      temp = temp.filter((tag: ITag) =>
        tag.tag.toLowerCase().includes(search.toLowerCase())
      );
    }

    values.tags.forEach((tag: ITag) => {
      temp = temp.filter(
        (t: ITag) => tag.tag.toLowerCase() !== t.tag.toLowerCase()
      );
    });
    return temp;
  }, [search, values.title, values.tags, allTags]);
  return (
    <div>
      <div className="flex flex-col w-full">
        <div className="prompt w-1/3 mb-4">
          <TextField
            onChange={(e: any) => setFieldValue("prompt", e.target.value)}
            name="prompt"
            size="small"
            value={values.prompt}
            label="Prompt"
            placeholder="Prompt"
            multiline
            rows={5}
            fullWidth
            disabled={props.loading}
            InputProps={{ sx: { fontSize: "12px" } }}
            InputLabelProps={{ sx: { fontSize: "12px" } }}
          />
        </div>
        <Divider />
        <div className="prompt flex flex-col gap-1 mt-4">
          <div>
            <div>
              {values.tags.length === 0 && (
                <Typography variant="body2">{`Add atleast ${5} tags`}</Typography>
              )}
              {values.tags.length < 5 && values.tags.length !== 0 && (
                <Typography variant="body2">{`Add ${
                  5 - values.tags.length
                } more tag(s)`}</Typography>
              )}
              {values.tags.length >= 5 && (
                <Typography variant="body2">{`Add tags`}</Typography>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center w-full">
            <div>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e: any) => setSearch(e.target.value)}
                  disabled={props.loading}
                />
              </Search>
            </div>
          </div>
          <Divider />
          <div className="text-center">
            {loading && <CircularProgress variant="indeterminate" size={20} />}
            {error && (
              <CustomError message={error} onClick={handleReloadTags} />
            )}
            <Grid container spacing={1}>
              {values &&
                values.tags &&
                values.tags.map((tag: ITag) => (
                  <Grid key={`key-${v4()}`} item>
                    <Chip
                      color="primary"
                      onDelete={() => handleRemoveTag(tag)}
                      onClick={() => handleRemoveTag(tag)}
                      key={`key-${v4()}`}
                      label={tag.tag}
                      size="small"
                    />
                  </Grid>
                ))}
            </Grid>
          </div>
          <div className={`p-3 ${classes.tagsContainer}`}>
            <Grid container spacing={2}>
              {tags.map(
                (tag: ITag, index: number) =>
                  index < 20 && (
                    <Grid key={`key-${v4()}`} item>
                      <Chip
                        onClick={() => handleSelectTag(tag)}
                        key={`key-${v4()}`}
                        label={tag.tag}
                        disabled={props.loading}
                        size="small"
                      />
                    </Grid>
                  )
              )}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

const Search = styled("div")(({ theme }: any) => ({
  position: "relative",
  borderRadius: "25px",
  border: "1px solid rgba(0,0,0,0.2)",
  backgroundColor: alpha("#e9ddf8", 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: "1px solid rgba(0,0,0,0.8)",
  },
  "&:focus": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: "1px solid",
    borderColor: theme.palette.primary,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "600px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
  height: "32px",
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "500px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    fontSize: "12px",
  },
}));
export default MoreDetailsScreen;
