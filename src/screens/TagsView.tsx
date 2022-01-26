import { Home, Tag } from '@mui/icons-material';
import { Paper, CircularProgress } from '@mui/material';
import React from 'react';
import { SomeContainer } from './Dashboard';
import TopSection from '../components/TopSection';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/combineReducers';

const useStyles = makeStyles({
  container: {
    height: 'calc(100vh - 150px)',
  },
});
const TagsView = () => {
  const classes = useStyles();
  const {
    loading,
    error,
    blog: tags,
  } = useSelector((state: RootState) => state.tags);
  const items = [
    {
      name: 'Admin',
      link: '/',
      isActive: false,
      icon: <Home sx={{ mr: 0.5 }} fontSize="medium" />,
    },
    {
      name: 'Tags',
      link: '/tags',
      isActive: true,
      icon: <Tag sx={{ mr: 0.5 }} fontSize="medium" />,
    },
  ];
  return (
    <SomeContainer>
      <div className="flex flex-col gap-3">
        <div>
          <TopSection breadCrumbsOnly items={items} />
        </div>
        <div>
          <Paper className={classes.container}>
            <div className="flex flex-col justify-center">
              <div>
                {loading && <CircularProgress variant="indeterminate" />}
                {error && <Typography>{error}</Typography>}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </SomeContainer>
  );
};

export default TagsView;
