import { PersonOutline, Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { DefaultTheme, makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme: DefaultTheme) => ({
  navbar: {
    background: '#fff !important',
    borderBottom: '1px solid #e6e6f9',
  },
  brandText: {
    fontStyle: 'italic',
    fontFamily: 'Source Sans Pro',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
}));
interface ICustomNavbar {
  open: boolean;
  openDrawer: (open: boolean) => void;
}
const CustomNavbar = (props: ICustomNavbar) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const matches = useMediaQuery('(max-width:600px)');

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
            sx={{ flexGrow: 1 }}>
            Long Story Short
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <PersonOutline />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CustomNavbar;
