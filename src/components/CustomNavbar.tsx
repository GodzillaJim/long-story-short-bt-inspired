import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DefaultTheme, makeStyles } from "@mui/styles";
import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
} from "mdbreact";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { logoutAction } from "../redux/actions/AuthAction";
import CustomToastify from "./CustomToastify";

const useStyles = makeStyles((theme: DefaultTheme) => ({
  navbar: {
    background: "#fff !important",
    borderBottom: "1px solid #e6e6f9",
  },
  brandText: {
    fontStyle: "italic",
    fontFamily: "Source Sans Pro",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  userIcon: {
    color: "#9c27b0",
  },
}));
interface ICustomNavbar {
  open: boolean;
  openDrawer: (open: boolean) => void;
}
const CustomNavbar = (props: ICustomNavbar) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:600px)");
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(logoutAction());
    toast.success("Logout successful. Redirecting to login page", {
      onClose: () => navigate("/login"),
    });
  };

  return (
    <div>
      <CustomToastify />
      <AppBar className={classes.navbar} elevation={1}>
        <Toolbar>
          {matches && (
            <IconButton onClick={() => props.openDrawer(!props.open)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            className={classes.brandText}
            color="textPrimary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Long Story Short
          </Typography>
          <div>
            <Typography variant="caption">{JSON.stringify(user)}</Typography>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon className={classes.userIcon} icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href="#!">Account</MDBDropdownItem>
                <MDBDropdownItem onClick={logout}>Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomNavbar;
