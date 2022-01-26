import { Edit, Home, Notes } from '@mui/icons-material';
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
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { array, object, string } from 'yup';
import CustomToastify from '../components/CustomToastify';
import DefaultText from '../components/DefaultText';
import Persona from '../components/Persona';
import TopSection from '../components/TopSection';
import TagPicker from '../pickers/TagPicker';
import {
  fetchBlogDetailsAction,
  fetchCategoriesAction,
  publishArticleAction,
  unPublishArticleAction,
  updateArticleAction,
} from '../redux/actions/BlogActions';
import { RootState } from '../redux/combineReducers';
import { UPDATE_ARTICLE_RESET } from '../redux/constants/Constants';
import { IArticle } from './CreateArticleContainer';
import { SomeContainer } from './Dashboard';

const useStyles = makeStyles({
  rootLoading: {
    height: 'calc(100vh - 100px)',
    marginTop: '12px',
    marginBottom: '12px',
    paddingTop: '200px',
  },
  retryButton: {
    fontWeight: 'bold !important',
    fontSize: '1.2em !important',
    width: 'fit-content',
    margin: 'auto !important',
  },
});

const EditArticleContainer = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState<boolean>(false);
  const message = 'This field is required';
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
      title: 'Sample Title',
      prompt: 'Sample Prompt',
      summary: 'Sample summary',
      content: 'Sample content',
      tags: [],
      category: '',
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
      console.log(values);
      const article = { ...values, id: id ? parseInt(id) : 1 };
      dispatch(updateArticleAction(article));
    },
  });

  const { loading, error, blog } = useSelector(
    (state: RootState) => state.blogDetails
  );
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
      toast.success('Changes saved successfully!', {
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
        toast.error(unPublishingError);
      }
      if (unPublished) {
        toast.success('Article Unpublished successfully');
      }
    }
  }, [unPublishing, unPublished, unPublishingError]);
  useEffect(() => {
    if (!publishing) {
      if (publishingError) {
        toast.error(publishingError);
      }
      if (published) {
        toast.success('Published successfully');
      }
    }
  }, [publishing, publishingError, published]);
  useEffect(() => {
    if (!loading && !error && !blog) {
      if (id) {
        dispatch(fetchBlogDetailsAction(parseInt(id)));
      }
    }
  }, [loading, error, blog, id, dispatch]);
  //TODO Fetch article by id
  const handleRetry = () => {
    if (id) {
      dispatch(fetchBlogDetailsAction(parseInt(id)));
    }
  };
  const items = [
    {
      name: 'Admin',
      link: '/',
      isActive: false,
      icon: <Home sx={{ mr: 0.5 }} fontSize="medium" />,
    },
    {
      name: 'Articles',
      link: '/articles',
      isActive: false,
      icon: <Notes sx={{ mr: 0.5 }} fontSize="medium" />,
    },
    {
      name: id || 'article',
      link: `/articles/${id}`,
      isActive: true,
      icon: <Edit sx={{ mr: 0.5 }} fontSize="medium" />,
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
    setFieldValue('title', e.target.value || '');
  };
  //TODO: Implement fetch categories from backend
  const getCategoriesList = () => {
    return categories || [];
  };
  const handleEdit = () => {
    if (blog) {
      const { title, summary, content, category, prompt, tags } = blog;
      setValues({
        title,
        summary,
        content,
        category,
        prompt,
        tags,
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
                actionText={'Edit Article'}
              />
            </div>
          </div>
          {loading && (
            <Paper className={classes.rootLoading}>
              <div>
                <CircularProgress variant="indeterminate" />
              </div>
            </Paper>
          )}
          {error && (
            <Paper className={classes.rootLoading}>
              <div className="flex flex-col gap-1 justify-center">
                <Typography textAlign={'center'} variant="h6" color="red">
                  {error}
                </Typography>
                <Button
                  className={classes.retryButton}
                  color="primary"
                  onClick={handleRetry}
                  variant="text">
                  Retry
                </Button>
              </div>
            </Paper>
          )}
          {blog && (
            <Paper>
              <form noValidate onSubmit={handleSubmit}>
                <div className="w-full grid grid-cols-12 p-3">
                  <div
                    style={{ borderRight: '1px solid rgba(0,0,0,0.2)' }}
                    className="col-span-9 pt-4 px-3 pr-2">
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
                                label={'Title'}
                                variant="outlined"
                                size="small"
                                helperText={
                                  touched.title ? errors.title : undefined
                                }
                                fullWidth
                                disabled={loading || updating}
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
                                    size="20px"
                                    variant="indeterminate"
                                  />
                                )}
                                {!categoryLoading && (
                                  <FormControl fullWidth size="small">
                                    <InputLabel
                                      margin="dense"
                                      id="demo-simple-select-label">
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
                                          'category',
                                          e.target.value
                                        )
                                      }>
                                      {getCategoriesList().map((cat: any) => (
                                        <MenuItem
                                          key={`key-${v4()}`}
                                          value={cat.value}>
                                          {cat.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    {(categoryLoading || categoryError) && (
                                      <FormHelperText>
                                        {categoryLoading
                                          ? 'Loading categories'
                                          : 'Categories failed to load. Try reloading'}
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
                                    setFieldValue('summary', e.target.value)
                                  }
                                  minRows={6}
                                  style={{
                                    width: '100%',
                                    textAlign: 'justify',
                                    padding: '4px',
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {!isEditing && (
                            <div>
                              <div>
                                <Typography fontWeight={'bold'} variant="body1">
                                  Contents
                                </Typography>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: 'sans-serif',
                                    textAlign: 'justify',
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
                            <Typography fontWeight={'bold'} variant="body1">
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
                                    date={comment.date}
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
                          <div style={{ width: 'fit-content' }}>
                            <CircularProgress variant="indeterminate" />
                          </div>
                        )}
                        {!publishing && !unPublishing && (
                          <Button
                            className="m-auto"
                            disabled={updating}
                            color={!blog.published ? 'primary' : 'secondary'}
                            onClick={
                              blog.published
                                ? handleUnPublishArticle
                                : handlePublishArticle
                            }
                            variant="contained">
                            {!blog.published ? 'Publish' : 'Unpublish'}
                          </Button>
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
                                    setFieldValue('summary', e.target.value)
                                  }
                                  minRows={6}
                                  style={{
                                    width: '100%',
                                    textAlign: 'justify',
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {!isEditing && (
                            <div className="flex flex-col gap-1">
                              <div>
                                <Typography fontWeight={'bold'} variant="body1">
                                  Summary
                                </Typography>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: 'sans-serif',
                                    textAlign: 'justify',
                                  }}>
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
                                    setFieldValue('prompt', e.target.value)
                                  }
                                  minRows={6}
                                  style={{
                                    width: '100%',
                                    textAlign: 'justify',
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          {!isEditing && (
                            <div className="flex flex-col gap-1">
                              <div>
                                <Typography fontWeight={'bold'} variant="body1">
                                  Prompt
                                </Typography>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: 'sans-serif',
                                    textAlign: 'justify',
                                  }}>
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
                              <Typography fontWeight={'bold'} variant="body1">
                                Tags
                              </Typography>
                            </div>
                            {isEditing && (
                              <TagPicker
                                setFieldValue={(newValue) =>
                                  setFieldValue('tags', newValue)
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
                                          label={tag}
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
                              <Button
                                onClick={() => setEditing(!isEditing)}
                                color="secondary"
                                disabled={updating}
                                variant="outlined">
                                Cancel
                              </Button>
                            </div>
                            <div>
                              <Button
                                disabled={!isValid || updating}
                                onClick={() => submitForm()}
                                color="secondary"
                                variant="contained">
                                Save
                              </Button>
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
