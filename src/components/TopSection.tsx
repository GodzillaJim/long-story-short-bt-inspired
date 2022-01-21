import { Home } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import CustomAddButton from './CustomAddButton';
import CustomBreadcrumbContainer from './CustomBreadcrumbContainer';

interface ITopSection {
  items: {
    name: string;
    link: string;
    isActive: boolean;
    icon: JSX.Element;
  }[];
  actionText: string;
}
const TopSection = (props: ITopSection) => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <div>
      <div className="flex flex-row justify-between">
        {!matches && (
          <div className="mt-1.5">
            <CustomBreadcrumbContainer items={props.items} />
          </div>
        )}
        <div>
          <CustomAddButton onClick={() => ''} text={'Create Blog'} />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
