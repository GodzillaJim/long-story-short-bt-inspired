import { Home } from "@mui/icons-material";
import { Paper, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import TopSection from "../components/TopSection";
import { RootState } from "../redux/combineReducers";
import { CREATE_BLOG_RESET } from "../redux/constants/ArticleConstants";
import { useStyles } from "./UserView";

const Dashboard = () => {
  const { authToken } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    if (authToken === "") {
      const data = sessionStorage.getItem("data");
      if (data) {
        const { token } = JSON.parse(data);
        if (token && token !== "") {
          if (location.pathname !== "/login") {
            const redirect = location.pathname;
            navigate(`/login?redirect=${redirect}`);
          }
        }
      }
    }
  }, [authToken, location, navigate]);
  const items = [
    {
      name: "Admin",
      link: "/home",
      isActive: false,
      icon: <Home className={classes.icon} />,
    },
  ];
  return (
    <SomeContainer>
      <div className="flex flex-col gap-5">
        <div className="w-full dashboard-container-bar">
          <TopSection
            items={items}
            onClick={() => {
              dispatch({ action: CREATE_BLOG_RESET });
              navigate("/articles/create");
            }}
            actionText={"Create a Blog"}
          />
        </div>
        <div className="dashboard-search-container">
          {/* TODO: Dashboard content */}
        </div>
      </div>
    </SomeContainer>
  );
};

export const SomeContainer = (props: { children: JSX.Element }) => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <div
      className={
        matches ? "flex flex-col gap-5 my-3" : "flex flex-col gap-5 my-2 mx-2"
      }
    >
      {props.children}
    </div>
  );
};

export default Dashboard;
