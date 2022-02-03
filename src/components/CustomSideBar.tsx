import {
  Category,
  ChevronLeft,
  ChevronRight,
  Home,
  Notes,
  People,
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
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
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
    paddingLeft: "8px",
  },
  listItemActive: {
    backgroundColor: "#e9ddf8 !important",
    overflow: "hidden",
    width: "100%",
    fontFamily: "Source Sans Pro",
    paddingLeft: "8px",
  },
  itemMargin: {
    marginRight: "12px",
  },
  icon: {
    fontSize: "16px !important",
    fontWeight: "500 !important",
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
  const classes = useStyles({ width: "40px" });
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
      icon: <Home className={classes.icon} />,
      link: "/home",
    },
    {
      classes,
      key: `key-${v4()}`,
      text: "Users",
      icon: <People className={classes.icon} />,
      link: "/users",
    },
    {
      classes,
      key: `key-${v4()}`,
      text: "Articles",
      icon: <Notes className={classes.icon} />,
      link: "/articles",
    },
    {
      classes,
      key: `key-${v4()}`,
      text: "Tags",
      icon: <Tag className={classes.icon} />,
      link: "/tags",
    },
    {
      classes,
      key: `key-${v4()}`,
      text: "Category",
      icon: <Category className={classes.icon} />,
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

  return (
    <ListItem
      onClick={() => navigate(props.link)}
      className={!isActive ? classes.listItem : classes.listItemActive}
      button
      color={isActive ? "secondary" : "primary"}
      sx={{ paddingLeft: "8px" }}
    >
      <ListItemIcon
        sx={{ minWidth: "36px" }}
        className={matches ? classes.itemMargin : ""}
      >
        {props.icon}
      </ListItemIcon>
      <ListItemText
        disableTypography
        children={<Typography variant="subtitle2">{props.text}</Typography>}
      />
    </ListItem>
  );
};
export default CustomSideBar;
