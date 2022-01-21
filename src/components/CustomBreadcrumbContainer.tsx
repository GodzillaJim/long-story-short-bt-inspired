import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { v4 } from 'uuid';

interface IItem {
  name: string;
  link: string;
  isActive: boolean;
  icon: JSX.Element;
}
interface IContainer {
  items: IItem[];
}
const useStyles = makeStyles({
  breadCrumb: {
    fontFamily: 'Source Sans Pro',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: '14px',
  },
});
const CustomBreadcrumbContainer = (props: IContainer) => {
  const classes = useStyles();
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb">
      {props.items.map((item: IItem) => (
        <Link
          className={classes.breadCrumb}
          key={`key-${v4()}`}
          underline="hover"
          color={item.isActive ? 'primary' : 'text.primary'}
          href={item.link}>
          <div className="flex flex-row">
            <div>{item.icon}</div>
            <div className="mt-1">{item.name}</div>
          </div>
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbContainer;
