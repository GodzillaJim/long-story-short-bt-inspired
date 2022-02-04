import { Edit, Home, Notes } from "@mui/icons-material";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { array, object, string } from "yup";

import CustomToastify from "../components/CustomToastify";
import DefaultText from "../components/DefaultText";
import Persona from "../components/Persona";
import TopSection from "../components/TopSection";
import TagPicker from "../pickers/TagPicker";
import {
  fetchBlogDetailsAction,
  fetchCategoriesAction,
  publishArticleAction,
  unPublishArticleAction,
  updateArticleAction,
} from "../redux/actions/BlogActions";
import { RootState } from "../redux/combineReducers";
import CustomButton from "../components/CustomButton";
import {
  PUBLISH_ARTICLE_RESET,
  UNPUBLISH_ARTICLE_RESET,
  UPDATE_ARTICLE_RESET,
} from "../redux/constants/ArticleConstants";

import { SomeContainer } from "./Dashboard";
import { ICategory, ITag, IArticle } from "../types";
import { useStyles as customStyles } from "../styles/styles";

const useStyles = makeStyles({
  rootLoading: {
    height: "calc(100vh - 100px)",
    marginTop: "12px",
    marginBottom: "12px",
    paddingTop: "200px",
  },
  retryButton: {
    fontWeight: "bold !important",
    fontSize: "1.2em !important",
    width: "fit-content",
    margin: "auto !important",
  },
  textArea: {
    "&:focus": {
      border: "1px solid rgba(0,0,0, 0.6) !important",
      outline: "none !important",
    },
  },
});

const EditArticleContainer = () => {
  const { id } = useParams();
  const classes = useStyles();
  const customClasses = customStyles();
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState<boolean>(false);
  const message = "This field is required";
  const { loading, error, blog } = useSelector(
    (state: RootState) => state.blogDetails
  );
  const {
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
    setValues,
    submitForm,
    isValid,
  } = useFormik<IArticle>({
    initialValues: {
      title: "Sample Title",
      prompt: "Sample Prompt",
      summary: "Sample summary",
      content: "Sample content",
      tags: [],
      category: "",
      createdOn: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      archived: false,
      published: false,
      comments: [],
      id: 0,
    },
    validationSchema: object().shape({
      title: string().required(message),
      prompt: string().optional(),
      summary: string().required(message),
      content: string().required(message),
      tags: array().min(3),
      category: string().required(message),
    }),
    onSubmit: (values: IArticle) => {
      const tags = values.tags.map((tag: ITag) => ({ tag: tag.tag }));
      const article = { ...values, id: id ? parseInt(id) : 1 };
      dispatch(updateArticleAction({ ...blog, ...article, tags }));
    },
  });

  const {
    loading: publishing,
    error: publishingError,
    blog: published,
  } = useSelector((state: RootState) => state.publishArticle);
  const {
    loading: categoryLoading,
    error: categoryError,
    blog: categories,
  } = useSelector((state: RootState) => state.categories);
  const {
    loading: unPublishing,
    error: unPublishingError,
    blog: unPublished,
  } = useSelector((state: RootState) => state.unPublishArticle);

  const {
    loading: updating,
    error: updateError,
    success: updated,
  } = useSelector((state: RootState) => state.updateArticle);

  useEffect(() => {
    if (updated) {
      toast.success("Changes saved successfully!", {
        onClose: () => dispatch({ type: UPDATE_ARTICLE_RESET }),
      });
    }
    if (updateError) {
      toast.error(updateError);
    }
  }, [updating, updateError, updated, dispatch]);
  useEffect(() => {
    if (!unPublishing) {
      if (unPublishingError) {
        toast.error(unPublishingError, {
          onClose: () => dispatch({ type: UNPUBLISH_ARTICLE_RESET }),
        });
      }
      if (unPublished) {
        toast.success("Article Unpublished successfully", {
          onClose: () => dispatch({ type: UNPUBLISH_ARTICLE_RESET }),
        });
      }
    }
  }, [unPublishing, unPublished, unPublishingError, dispatch]);
  useEffect(() => {
    if (!publishing) {
      if (publishingError) {
        toast.error(publishingError, {
          onClose: () => dispatch({ type: PUBLISH_ARTICLE_RESET }),
        });
      }
      if (published) {
        toast.success("Published successfully", {
          onClose: () => dispatch({ type: PUBLISH_ARTICLE_RESET }),
        });
      }
    }
  }, [publishing, publishingError, published, dispatch]);
  useEffect(() => {
    if (!loading && !error && !blog) {
      if (id) {
        dispatch(fetchBlogDetailsAction(parseInt(id)));
      }
    }
  }, [loading, error, blog, id, dispatch]);
  // TODO Fetch article by id
  const handleRetry = () => {
    if (id) {
      dispatch(fetchBlogDetailsAction(parseInt(id)));
    }
  };
  const items = [
    {
      name: "Admin",
      link: "/",
      isActive: false,
      icon: <Home className={customClasses.icon} />,
    },
    {
      name: "Articles",
      link: "/articles",
      isActive: false,
      icon: <Notes className={customClasses.icon} />,
    },
    {
      name: id || "article",
      link: `/articles/${id}`,
      isActive: true,
      icon: <Edit className={customClasses.icon} />,
    },
  ];
  const handlePublishArticle = () => {
    if (id) {
      dispatch(publishArticleAction(parseInt(id)));
    }
  };
  const handleUnPublishArticle = () => {
    if (id) {
      dispatch(unPublishArticleAction(parseInt(id)));
    }
  };
  const handleTitleChange = (e: any) => {
    setFieldValue("title", e.target.value || "");
  };
  // TODO: Implement fetch categories from backend
  const categoriesList = useMemo(() => {
    let temp = categories || [];
    temp = temp.map((category: ICategory) => ({
      ...category,
      label: category.name,
      value: category.name,
    }));
    return temp;
  }, [categories]);
  const handleEdit = () => {
    if (blog) {
      const {
        title,
        summary,
        content,
        category,
        prompt,
        tags,
        published,
        id,
        lastModified,
        createdOn,
        comments,
      } = blog;
      setValues({
        title,
        summary,
        content,
        category,
        prompt,
        tags,
        id,
        published,
        lastModified,
        createdOn,
        comments,
        archived: false,
      });
      setEditing(!isEditing);
      dispatch(fetchCategoriesAction());
    }
  };
  return (
    <div>
      <SomeContainer>
        <div className="flex flex-col gap-5">
          <div>
            <div>
              <TopSection
                items={items}
                onClick={handleEdit}
                actionText={"Edit Article"}
              />
            </div>
          </div>
          {loading && (
            <Paper className={classes.rootLoading}>
              <div className="text-center">
                <CircularProgress size={20} variant="indeterminate" />
              </div>
            </Paper>
          )}
          {error && (
            <Paper className={classes.rootLoading}>
              <div className="flex flex-col gap-1 justify-center">
                <Typography textAlign={"center"} variant="h6" color="red">
                  {error}
                </Typography>
                <CustomButton
                  className={classes.retryButton}
                  color="primary"
                  onClick={handleRetry}
                  variant="text"
                >
                  Retry
                </CustomButton>
              </div>
            </Paper>
          )}
          {blog && (
            <Paper>
              <form noValidate onSubmit={handleSubmit}>
                <div className="w-full grid grid-cols-12 p-3">
                  <div
                    style={{ borderRight: "1px solid rgba(0,0,0,0.2)" }}
                    className="col-span-9 pt-4 px-3 pr-2"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="title-and-category">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="title col-span-1">
                            {!isEditing && (
                              <DefaultText
                                label="Title"
                                value={blog && blog.title}
                              />
                            )}
                            {isEditing && (
                              <TextField
                                key={`article-title-edit`}
                                id="title"
                                value={values.title}
                                onChange={handleTitleChange}
                                label={"Title"}
                                variant="outlined"
                                size="small"
                                helperText={
                                  touched.title ? errors.title : undefined
                                }
                                fullWidth
                                disabled={loading || updating}
                                InputProps={{ sx: { fontSize: "12px" } }}
                              />
                            )}
                          </div>
                          <div className="category text-center col-span-1">
                            {!isEditing && (
                              <DefaultText
                                label="Category"
                                value={blog && blog.category}
                              />
                            )}
                            {isEditing && (
                              <>
                                {categoryLoading && (
                                  <CircularProgress
                                    size={20}
                                    variant="indeterminate"
                                  />
                                )}
                                {!categoryLoading && (
                                  <FormControl size="small">
                                    <InputLabel
                                      margin="dense"
                                      id="demo-simple-select-label"
                                    >
                                      Category
                                    </InputLabel>
                                    <Select
                                      labelId="category-select-label"
                                      id="category-select"
                                      value={values.category}
                                      disabled={updating}
                                      label="Category"
                                      placeholder="Select article category"
                                      onChange={(e: any) =>
                                        setFieldValue(
                                          "category",
                                          e.target.value
                                        )
                                      }
                                      sx={{ fontSize: "12px" }}
                                    >
                                      {categoriesList.map((cat: any) => (
                                        <MenuItem
                                          key={`key-${v4()}`}
                                          value={cat.value}
                                          sx={{ fontSize: "12px" }}
                                        >
                                          {cat.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {(categoryLoading || categoryError) && (
                                      <FormHelperText>
                                        {categoryLoading
                                          ? "Loading categories"
                                          : "Categories failed to load. Try reloading"}
                                      </FormHelperText>
                                    )}
                                  </FormControl>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Divider />
                      <div className="contents overflow-auto">
                        <div className="flex flex-col gap-1">
                          {isEditing && (
                            <div className="flex flex-col">
                              <div>
                                <Typography variant="caption" fontWeight="bold">
                                  Content
                                </Typography>
                              </div>
                              <div>
                                <TextareaAutosize
                                  title="Content"
                                  name="content"
                                  disabled={loading || updating}
                                  value={values.content}
                                  onChange={(e) =>
                                    setFieldValue("summary", e.target.value)
                                  }
                                  className={classes.textArea}
                                  minRows={6}
                                  style={{
                                    width: "100%",
                                    textAlign: "justify",
                                    padding: "8px",
                                    fontSize: "12px",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {!isEditing && (
                            <div>
                              <div>
                                <Typography fontWeight={"bold"} variant="body1">
                                  Contents
                                </Typography>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: "sans-serif",
                                    textAlign: "justify",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: blog.content,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Divider />
                      <div className="comments">
                        <div className="flex flex-col gap-3">
                          <div>
                            <Typography fontWeight={"bold"} variant="caption">
                              Comments
                            </Typography>
                          </div>
                          <div>
                            <div className="flex flex-col gap-4">
                              {blog &&
                                blog.comments &&
                                blog.comments.map((comment: any) => (
                                  <Persona
                                    key={`key-${v4()}`}
                                    fullName={`${comment.firstName} ${comment.lastName}`}
                                    content={comment.content}
                                    date={new Date()}
                                  />
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 ml-2">
                    <div className="flex flex-col p-3 justify-center gap-3">
                      <div className="flex flex-row justify-center text-center">
                        {(publishing || unPublishing) && (
                          <div style={{ width: "fit-content" }}>
                            <CircularProgress
                              size={20}
                              variant="indeterminate"
                            />
                          </div>
                        )}
                        {!publishing && !unPublishing && (
                          <CustomButton
                            className="m-auto"
                            disabled={updating}
                            color={!blog.published ? "primary" : "secondary"}
                            onClick={
                              blog.published
                                ? handleUnPublishArticle
                                : handlePublishArticle
                            }
                            variant="contained"
                            size="small"
                          >
                            {!blog.published ? "Publish" : "Unpublish"}
                          </CustomButton>
                        )}
                      </div>
                      <Divider />
                      <div>
                        <div className="contents overflow-auto">
                          {isEditing && (
                            <div className="flex flex-col">
                              <div>
                                <Typography fontWeight="bold" variant="caption">
                                  Summary
                                </Typography>
                              </div>
                              <div>
                                <TextareaAutosize
                                  title="Summary"
                                  name="summary"
                                  disabled={loading || updating}
                                  value={values.summary}
                                  onChange={(e) =>
                                    setFieldValue("summary", e.target.value)
                                  }
                                  minRows={6}
                                  style={{
                                    width: "100%",
                                    textAlign: "justify",
                                    fontSize: "12px",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {!isEditing && (
                            <div className="flex flex-col gap-1">
                              <div>
                                <Typography fontWeight={"bold"} variant="body1">
                                  Summary
                                </Typography>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: "sans-serif",
                                    textAlign: "justify",
                                  }}
                                >
                                  {blog.summary}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="contents overflow-auto">
                          {isEditing && (
                            <div className="flex flex-col">
                              <div>
                                <Typography variant="caption" fontWeight="bold">
                                  Prompt
                                </Typography>
                              </div>
                              <div>
                                <TextareaAutosize
                                  title="prompt"
                                  name="prompt"
                                  disabled={loading || updating}
                                  value={values.prompt}
                                  onChange={(e) =>
                                    setFieldValue("prompt", e.target.value)
                                  }
                                  minRows={6}
                                  style={{
                                    width: "100%",
                                    textAlign: "justify",
                                    fontSize: "12px",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {!isEditing && (
                            <div className="flex flex-col gap-1">
                              <div>
                                <Typography fontWeight={"bold"} variant="body1">
                                  Prompt
                                </Typography>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: "sans-serif",
                                    textAlign: "justify",
                                  }}
                                >
                                  {blog.prompt}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <div className="contents overflow-auto">
                          <div className="flex flex-col gap-1">
                            <div>
                              <Typography fontWeight={"bold"} variant="caption">
                                Tags
                              </Typography>
                            </div>
                            {isEditing && (
                              <TagPicker
                                setFieldValue={(newValue) =>
                                  setFieldValue("tags", newValue)
                                }
                                values={values.tags}
                                disabled={updating}
                              />
                            )}
                            {!isEditing && (
                              <div>
                                <Grid container spacing={1}>
                                  {blog &&
                                    blog.tags &&
                                    blog.tags.map((tag: any) => (
                                      <Grid key={`key-${v4()}`} item>
                                        <Chip
                                          color="primary"
                                          key={`key-${v4()}`}
                                          label={tag.tag.slice(0, 8)}
                                          size="small"
                                        />
                                      </Grid>
                                    ))}
                                </Grid>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Divider />
                      <div className="submit-buttons">
                        {isEditing && (
                          <div className="flex flex-row gap-3 justify-end">
                            <div>
                              <CustomButton
                                onClick={() => setEditing(!isEditing)}
                                color="secondary"
                                disabled={updating}
                                variant="outlined"
                                size="small"
                              >
                                Cancel
                              </CustomButton>
                            </div>
                            <div>
                              <CustomButton
                                disabled={!isValid || updating}
                                onClick={() => submitForm()}
                                color="secondary"
                                variant="contained"
                                size="small"
                              >
                                Save
                              </CustomButton>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Paper>
          )}
        </div>
      </SomeContainer>
      <CustomToastify />
    </div>
  );
};

export default EditArticleContainer;
