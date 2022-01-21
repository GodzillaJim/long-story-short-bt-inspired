import { Check, Close, Edit, Home, Notes } from '@mui/icons-material';
import {
  Icon,
  IconButton,
  Pagination,
  Paper,
  TableCell,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import DataList from '../components/DataList';
import TopSection from '../components/TopSection';
import { getArticles, IArticle } from '../data/Articles';
import { SomeContainer } from './Dashboard';

const ArticlesView = () => {
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(10);
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
      isActive: true,
      icon: <Notes sx={{ mr: 0.5 }} fontSize="medium" />,
    },
  ];
  const getArticlesList = () => {
    return getArticles();
  };
  const headers = [
    'ID',
    'Title',
    'Category',
    'Published',
    'Content',
    'Archived',
    '',
  ];
  const navigate = useNavigate();
  const cellStyle = {
    fontFamily: 'Sans Serif',
    width: 'calc((100% - 48px) / 6)',
  };
  return (
    <div className="w-full">
      <SomeContainer>
        <div className="flex flex-col mb-4 h-100 gap-5">
          <div className="articles-top-section">
            <TopSection items={items} actionText={'Create a Blog'} />
          </div>
          <div className="articles-table">
            <DataList
              onRenderRow={(item: IArticle) => (
                <TableRow key={`key-${v4()}`}>
                  <TableCell sx={{}}>{item.id}</TableCell>
                  <TableCell sx={cellStyle}>{item.title}</TableCell>
                  <TableCell sx={cellStyle}>{item.category}</TableCell>
                  <TableCell sx={cellStyle}>
                    {item.published ? (
                      <Check sx={{ color: 'green' }} />
                    ) : (
                      <Close sx={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell sx={cellStyle}>
                    {item.content.substring(0, 100) + '...'}
                  </TableCell>
                  <TableCell sx={cellStyle}>
                    {item.archived ? (
                      <Check sx={{ color: 'green' }} />
                    ) : (
                      <Close sx={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell sx={{ width: '48px' }}>
                    <IconButton
                      onClick={() => navigate(`/articles/${item.id}`)}>
                      <Edit sx={{ color: '#1d0a33' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
              headers={headers}
              items={getArticlesList()}
            />
          </div>
          <div className="flex justify-center">
            <Paper className="p-1">
              <Pagination page={page} count={getArticlesList().length} />
            </Paper>
          </div>
        </div>
      </SomeContainer>
    </div>
  );
};

export default ArticlesView;
