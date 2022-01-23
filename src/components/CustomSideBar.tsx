import {
  Category,
  ChevronLeft,
  ChevronRight,
  Home,
  Notes,
  Person,
  Tag,
} from '@mui/icons-material';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { v4 } from 'uuid';

const useStyles = makeStyles((theme: any) => ({
  drawerContainer: (props: { width: string }) => ({
    height: '100%',
    width: props.width,
    position: 'fixed',
    paddingTop: '30px',
    backgroundColor: '#FFF',
    left: 0,
    fontFamily: 'Source Sans Pro',
    transition: '0.5s',
    borderRight: '1px solid #e6e6f9',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  }),
  listItem: {
    overflow: 'hidden',
    width: '100%',
    fontFamily: 'Source Sans Pro',
  },
  itemMargin: {
    marginRight: '12px',
  },
}));
interface ICustomSideBar {
  open: boolean;
  openDrawer: (open: boolean) => void;
  mouseOver: boolean;
  setMouseOver: () => void;
}
const CustomSideBar = (props: ICustomSideBar) => {
  const rtl: boolean = false;
  const classes = useStyles({ width: props.mouseOver ? '240px' : '60px' });
  const matches = useMediaQuery('(max-width:600px)');
  const handleMouseEnter = () => {
    props.setMouseOver();
  };
  const handleMouseLeave = () => {
    props.setMouseOver();
  };
  const items = [
    {
      classes,
      key: `key-${v4()}`,
      text: 'Home',
      icon: <Home />,
      link: '/home',
    },
    {
      classes,
      key: `key-${v4()}`,
      text: 'Users',
      icon: <Person />,
      link: '/users',
    },
    {
      classes,
      key: `key-${v4()}`,
      text: 'Articles',
      icon: <Notes />,
      link: '/articles',
    },
    { classes, key: `key-${v4()}`, text: 'Tags', icon: <Tag />, link: '/tags' },
    {
      classes,
      key: `key-${v4()}`,
      text: 'Category',
      icon: <Category />,
      link: '/categories',
    },
  ];
  return (
    <div>
      {matches && (
        <Drawer
          anchor="left"
          onClose={() => props.openDrawer(!props.open)}
          open={props.open}>
          <List>
            <ListItem key={`key-${v4()}`}>
              <IconButton onClick={() => props.openDrawer(!props.open)}>
                {!rtl ? <ChevronLeft /> : <ChevronRight />}
              </IconButton>
            </ListItem>
            {items.map((item: any) => (
              <CustomListItem {...item} />
            ))}
          </List>
        </Drawer>
      )}
      {!matches && (
        <div
          onMouseOut={handleMouseLeave}
          onMouseOver={handleMouseEnter}
          className={classes.drawerContainer}>
          {!matches && (
            <List>
              {items.map((item: any) => (
                <CustomListItem {...item} />
              ))}
            </List>
          )}
        </div>
      )}
    </div>
  );
};

interface IProp {
  text: string;
  icon: JSX.Element;
  classes: any;
  link: string;
}
const CustomListItem = (props: IProp) => {
  const { classes } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === props.link;
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <ListItem
      onClick={() => navigate(props.link)}
      className={classes.listItem}
      button
      color={isActive ? 'secondary' : 'inherit'}>
      <ListItemIcon className={matches ? classes.itemMargin : ''}>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};
export default CustomSideBar;
