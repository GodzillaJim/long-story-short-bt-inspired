import { CssBaseline, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import React, { useState } from "react";
import { Outlet } from "react-router";
import CustomNavbar from "../components/CustomNavbar";
import CustomSideBar from "../components/CustomSideBar";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "16px",
  },
  root: (props: { matches: boolean; open: boolean; mouseOver: boolean }) => ({
    width: props.matches
      ? "100%"
      : props.open
      ? "calc(100% - 120px)"
      : "calc(100% - 40px)",
    height: "100%",
    transition: "margin-left .5s",
    marginLeft: !props.matches ? (props.mouseOver ? "80px" : "0px") : "0px",
  }),
  topBar: {
    marginBottom: "0px",
  },
  sidebar: (props: { matches: boolean; open: boolean }) => ({
    width: props.open ? "120px" : "40px",
    minWidth: "fit-content",
    transition: "0.5s",
    display: props.matches ? "none" : "flex",
  }),
  containerRow: {
    marginTop: "20px",
  },
}));
const MainLayout = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const [open, openDrawer] = useState<boolean>(false);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const classes = useStyles({ matches, open, mouseOver });

  return (
    <MDBContainer className={classes.container} fluid>
      <CssBaseline />
      <MDBRow className={classes.topBar}>
        <MDBCol>
          <CustomNavbar open={open} openDrawer={openDrawer} />
        </MDBCol>
      </MDBRow>
      <MDBRow className={classes.containerRow}>
        <div className="flex flex-row w-full">
          <div className={classes.sidebar}>
            <CustomSideBar
              mouseOver={mouseOver}
              setMouseOver={() => setMouseOver(mouseOver ? false : true)}
              open={open}
              openDrawer={openDrawer}
            />
          </div>
          <div className={classes.root}>
            <Outlet />
          </div>
        </div>
      </MDBRow>
    </MDBContainer>
  );
};

export default MainLayout;
