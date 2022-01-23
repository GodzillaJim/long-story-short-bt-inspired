import {
  CircularProgress,
  Paper,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Home, Notes, Edit } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import TopSection from '../components/TopSection';
import { fetchBlogDetailsAction } from '../redux/actions/BlogActions';
import { RootState } from '../redux/combineReducers';
import { SomeContainer } from './Dashboard';
import DefaultText from '../components/DefaultText';
import Persona from '../components/Persona';
import { v4 } from 'uuid';

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
  const { loading, error, blog } = useSelector(
    (state: RootState) => state.blogDetails
  );

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
  return (
    <div>
      <SomeContainer>
        <div className="flex flex-col gap-5">
          <div>
            <div>
              <TopSection
                items={items}
                onClick={() => {
                  setEditing(!isEditing);
                }}
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
              <div className="w-full grid grid-cols-12 p-2">
                <div className="col-span-9">
                  <div className="flex flex-col gap-3">
                    <div className="title-and-category">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="title col-span-1">
                          <DefaultText
                            label="Title"
                            value={blog && blog.title}
                          />
                        </div>
                        <div className="category col-span-1">
                          <DefaultText
                            label="Category"
                            value={blog && blog.category}
                          />
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div className="contents overflow-auto">
                      <div className="flex flex-col gap-1">
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
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                          />
                        </div>
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
                <div className="col-span-3"></div>
              </div>
            </Paper>
          )}
        </div>
      </SomeContainer>
    </div>
  );
};

export default EditArticleContainer;
