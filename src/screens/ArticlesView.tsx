import { Home, Notes } from '@mui/icons-material';
import React from 'react';
import TopSection from '../components/TopSection';
import { SomeContainer } from './Dashboard';

const ArticlesView = () => {
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
  return (
    <div className="w-full">
      <SomeContainer>
        <div className="flex flex-col gap-5">
          <div className="articles-top-section">
            <TopSection items={items} actionText={'Create a Blog'} />
          </div>
        </div>
      </SomeContainer>
    </div>
  );
};

export default ArticlesView;
