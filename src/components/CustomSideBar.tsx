import {
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
import { makeStyles, useTheme } from '@mui/styles';
import React, { useState } from 'react';
import { v4 } from 'uuid';

const useStyles = makeStyles((theme: any) => ({
  drawerContainer: (props: { width: string }) => ({
    height: '100%',
    width: props.width,
    position: 'fixed',
    paddingTop: '30px',
    backgroundColor: '#8a8a8a',
    left: 0,
    fontFamily: 'Source Sans Pro',
    transition: '0.5s',
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
            <CustomListItem
              classes={classes}
              key={`key-${v4()}`}
              text="Home"
              icon={<Home />}
            />
            <CustomListItem
              classes={classes}
              key={`key-${v4()}`}
              text="Users"
              icon={<Person />}
            />
            <CustomListItem
              classes={classes}
              key={`key-${v4()}`}
              text="Notes"
              icon={<Notes />}
            />
            <CustomListItem
              classes={classes}
              key={`key-${v4()}`}
              text="Tags"
              icon={<Tag />}
            />
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
              <CustomListItem
                classes={classes}
                key={`key-${v4()}`}
                text="Home"
                icon={<Home />}
              />
              <CustomListItem
                classes={classes}
                key={`key-${v4()}`}
                text="Users"
                icon={<Person />}
              />
              <CustomListItem
                classes={classes}
                key={`key-${v4()}`}
                text="Notes"
                icon={<Notes />}
              />
              <CustomListItem
                classes={classes}
                key={`key-${v4()}`}
                text="Tags"
                icon={<Tag />}
              />
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
}
const CustomListItem = (props: IProp) => {
  const { classes } = props;
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <ListItem className={classes.listItem} button>
      <ListItemIcon className={matches ? classes.itemMargin : ''}>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};
export default CustomSideBar;
