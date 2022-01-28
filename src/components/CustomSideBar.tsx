import {
  Category,
  ChevronLeft,
  ChevronRight,
  Home,
  Notes,
  Person,
  Tag,
} from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { v4 } from "uuid";
import "./CustomSideBar.css";

const useStyles = makeStyles((theme: any) => ({
  drawerContainer: (props: { width: string }) => ({
    height: "100%",
    width: props.width,
    position: "fixed",
    paddingTop: "30px",
    backgroundColor: "#FFF",
    left: 0,
    fontFamily: "Source Sans Pro",
    transition: "0.5s",
    borderRight: "1px solid #e6e6f9",
  }),
  listItem: {
    overflow: "hidden",
    width: "100%",
    fontFamily: "Source Sans Pro",
  },
  listItemActive: {
    backgroundColor: "#e9ddf8 !important",
    overflow: "hidden",
    width: "100%",
    fontFamily: "Source Sans Pro",
  },
  itemMargin: {
    marginRight: "12px",
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
  const classes = useStyles({ width: "60px" });
  const matches = useMediaQuery("(max-width:600px)");
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
      text: "Home",
      icon: <Home />,
      link: "/home",
    },
    {
      classes,
      key: `key-${v4()}`,
      text: "Users",
      icon: <Person />,
      link: "/users",
    },
    {
      classes,
      key: `key-${v4()}`,
      text: "Articles",
      icon: <Notes />,
      link: "/articles",
    },
    { classes, key: `key-${v4()}`, text: "Tags", icon: <Tag />, link: "/tags" },
    {
      classes,
      key: `key-${v4()}`,
      text: "Category",
      icon: <Category />,
      link: "/categories",
    },
  ];
  return (
    <div>
      {matches && (
        <Drawer
          anchor="left"
          onClose={() => props.openDrawer(!props.open)}
          open={props.open}
        >
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`${classes.drawerContainer} MuiPaper-root MuiPaper-elevation MuiPaper-elevation1 sidebar `}
        >
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
  const isActive = location.pathname.includes(props.link);
  const matches = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    console.log(
      location.pathname,
      props.link,
      location.pathname === props.link
    );
  });
  return (
    <ListItem
      onClick={() => navigate(props.link)}
      className={!isActive ? classes.listItem : classes.listItemActive}
      button
      color={isActive ? "secondary" : "primary"}
    >
      <ListItemIcon className={matches ? classes.itemMargin : ""}>
        {props.icon}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
};
export default CustomSideBar;
