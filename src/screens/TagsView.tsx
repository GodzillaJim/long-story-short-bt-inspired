import { Home, Tag } from "@mui/icons-material";
import {
  Paper,
  CircularProgress,
  Divider,
  Grid,
  Chip,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { toast } from "react-toastify";

import TopSection from "../components/TopSection";
import { RootState } from "../redux/combineReducers";
import CustomError from "../components/CustomError";
import {
  addTagAction,
  fetchTagsAction,
  addTagsBulkAction,
} from "../redux/actions/BlogActions";
import CustomSearchBox from "../components/CustomSearchBox";
import CustomButton from "../components/CustomButton";
import "./TagsView.css";
import CustomToastify from "../components/CustomToastify";

import { SomeContainer } from "./Dashboard";
import { useStyles as customStyles } from "../styles/styles";
import { ITag } from "../types";

const useStyles = makeStyles({
  container: {
    height: "100%",
    paddingBottom: "8px",
  },
  addManyTags: {
    backgroundColor: "#e9ddf8",
    padding: "12px",
    width: "50%",
    borderRadius: "4px",
    "&:focus-visible": {
      outline: "none",
    },
  },
});
const TagsView = () => {
  const classes = useStyles();
  const customClasses = customStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const [newTags, setNewTags] = useState<string>("");
  const {
    loading,
    error,
    blog: tags,
  } = useSelector((state: RootState) => state.tags);
  React.useEffect(() => {
    if (!tags && !loading && !error) {
      dispatch(fetchTagsAction());
    }
  }, [loading, error, tags, dispatch]);
  const {
    loading: adding,
    error: addTagError,
    success,
  } = useSelector((state: RootState) => state.addTag);
  useEffect(() => {
    if (success) {
      toast.success("Tag added successfully");
    }
    if (addTagError) {
      toast.error(addTagError);
    }
  }, [adding, addTagError, success]);
  const {
    loading: addingBulk,
    error: addingBulkError,
    success: addingBulkSuccess,
  } = useSelector((state: RootState) => state.addTagsBulk);
  useEffect(() => {
    if (addingBulkError) {
      toast.error(addingBulkError);
    }
    if (addingBulkSuccess) {
      toast.success("Tags added");
    }
  }, [addingBulk, addingBulkError, addingBulkSuccess]);
  const items = [
    {
      name: "Admin",
      link: "/",
      isActive: false,
      icon: <Home className={customClasses.icon} />,
    },
    {
      name: "Tags",
      link: "/tags",
      isActive: true,
      icon: <Tag className={customClasses.icon} />,
    },
  ];

  const handleRetry = () => {
    dispatch(fetchTagsAction());
  };
  const filterTags = useMemo(() => {
    let temp = tags || [];
    if (search !== "") {
      temp = temp.filter((tag: ITag) =>
        tag.tag.toLowerCase().includes(search.toLowerCase())
      );
    }
    return temp;
  }, [search, tags]);
  React.useEffect(() => {
    console.log(tags);
  });
  const handleAddTag = () => {
    dispatch(addTagAction(search));
    // TODO: Add tag
  };
  const addManyTags = () => {
    const tagArr = newTags.split(",");
    dispatch(addTagsBulkAction(tagArr));
    // TODO: Add many tags
  };
  return (
    <SomeContainer>
      <div className="flex flex-col gap-3">
        <div>
          <TopSection breadCrumbsOnly items={items} />
        </div>
        <CustomToastify />
        <div>
          <Paper className={classes.container}>
            <div className="flex pt-3 flex-col">
              {(loading || error) && (
                <div className="text-center mt-4">
                  {loading && <CircularProgress variant="indeterminate" />}
                  {error && (
                    <CustomError message={error} onClick={handleRetry} />
                  )}
                </div>
              )}
              {tags && (
                <div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <CustomSearchBox
                        value={search}
                        maxWidth={"500px"}
                        onChange={(newValue: string) => setSearch(newValue)}
                        color="primary"
                      />
                    </div>
                    <Divider />
                    <div className="px-3">
                      <Grid container spacing={1}>
                        {tags &&
                          filterTags.map((tag: ITag) => (
                            <Grid item key={`key-${v4()}`}>
                              <Chip size="small" label={tag.tag} />
                            </Grid>
                          ))}
                        {filterTags.length === 0 && (
                          <Grid item>
                            {adding && (
                              <CircularProgress
                                size={20}
                                color="primary"
                                variant="indeterminate"
                              />
                            )}
                            {!adding && search !== "" && (
                              <CustomButton
                                onClick={handleAddTag}
                                color="primary"
                                variant="text"
                                size="small"
                              >
                                Add Tag
                              </CustomButton>
                            )}
                          </Grid>
                        )}
                      </Grid>
                    </div>
                    <Divider />
                    <div>
                      <div className="flex flex-col mx-3 gap-2">
                        <div>
                          <Typography variant="caption" fontWeight={"bold"}>
                            Add Many Tags
                          </Typography>
                        </div>
                        <div>
                          <TextareaAutosize
                            name="many-tags add-many-tags-text-area"
                            className={classes.addManyTags}
                            value={newTags}
                            onChange={(event) => setNewTags(event.target.value)}
                            minRows={5}
                            placeholder={"tag1, tag2, tag3, etc"}
                            style={{ fontSize: "12px" }}
                          />
                        </div>
                        <div>
                          {addingBulk && (
                            <CircularProgress
                              size={20}
                              variant="indeterminate"
                            />
                          )}
                          {!addingBulk && search !== "" && (
                            <CustomButton
                              variant="outlined"
                              color="secondary"
                              onClick={addManyTags}
                              disabled={newTags === ""}
                              size="small"
                              sx={{ fontSize: "small" }}
                            >
                              Add Tags
                            </CustomButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Paper>
        </div>
      </div>
    </SomeContainer>
  );
};

export default TagsView;
