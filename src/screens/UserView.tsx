import {
  CircularProgress,
  Paper,
  TableRow,
  TableCell,
  FormGroup,
  FormControlLabel,
  Switch,
  Pagination,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Home, Edit, People } from "@mui/icons-material";
import { SomeContainer } from "./Dashboard";
import TopSection from "../components/TopSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/combineReducers";
import { getAllUsersAction } from "../redux/actions/UserActions";
import { makeStyles } from "@mui/styles";
import CustomError from "../components/CustomError";
import DataList from "../components/DataList";
import { v4 } from "uuid";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import AddUserContainter from "./AddUserContainter";
import { useStyles as customStyles, cellStyle } from "../styles/styles";
import "./UserView.css";
import { IRole, IUser } from "../types";
import CustomButton from "../components/CustomButton";

export const useStyles = makeStyles({
  usersPaper: {
    height: "calc(100vh - 100px)",
    textAlign: "center",
    paddingTop: "16px",
  },
  icon: {
    fontSize: "12px !important",
    marginRight: "4px !important",
  },
});
const UserView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [addUser, setAddUser] = useState<boolean>(false);
  const classes = useStyles();
  const customClasses = customStyles();
  const { loading, error, users } = useSelector(
    (state: RootState) => state.allUsers
  );
  useEffect(() => {
    if (!loading && !users && !error) {
      dispatch(getAllUsersAction());
    }
  }, [loading, users, error, dispatch]);
  const items = [
    {
      name: "Admin",
      link: "/",
      isActive: false,
      icon: <Home className={customClasses.icon} />,
    },
    {
      name: "User",
      link: "/users",
      isActive: true,
      icon: <People className={customClasses.icon} />,
    },
  ];

  const handleAddUser = () => {
    setAddUser(!addUser);
  };
  const handleRetry = () => {
    dispatch(getAllUsersAction());
  };
  const userList = useMemo(() => {
    let temp = users || [];
    if (name !== "") {
      temp = temp.filter(
        (user: IUser) =>
          user.lastName
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase()) ||
          user.firstName.toLocaleLowerCase().includes(name.toLowerCase())
      );
    }
    if (email !== "") {
      temp = temp.filter((user: IUser) =>
        user.email.toLowerCase().includes(email.toLocaleLowerCase())
      );
    }
    if (isAdmin) {
      temp = temp.filter((user: IUser) =>
        user.roles.find((role: IRole) => role.roleName === "ROLE_ADMIN")
      );
    } else {
      temp = temp.filter(
        (user: IUser) =>
          !user.roles.find((role: IRole) => role.roleName === "ROLE_ADMIN")
      );
    }
    if (isActive) {
      temp = temp.filter((user: IUser) => user.active);
    } else {
      temp = temp.filter((user: IUser) => !user.active);
    }
    return temp;
  }, [users, name, email, isActive, isAdmin]);

  const handleEdit = (user: IUser) => {
    navigate(`/users/${user.id}`);
  };
  const headers = ["ID", "Username", "Name", "Email", "Created On", ""];

  return (
    <div>
      <SomeContainer>
        <div className={"flex flex-col gap-5"}>
          <TopSection
            items={items}
            actionText={"Add User"}
            onClick={handleAddUser}
            loading={addUser}
          />
          <div className="table-search">
            <Paper>
              <div className="grid grid-cols-3 px-3 py-2 gap-3">
                <div className="col-span-1">
                  <input
                    className="search-bar-title"
                    name="name"
                    value={name}
                    disabled={loading}
                    placeholder="Enter name to search..."
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <input
                    className="search-bar-title"
                    name="email"
                    value={email}
                    disabled={loading}
                    placeholder="Enter email to search..."
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <div className="flex flex-row justify-around">
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          sx={{ fontSize: "12px" }}
                          control={
                            <Switch
                              size="small"
                              color="secondary"
                              disabled={loading}
                              checked={isActive}
                              onChange={() => setIsActive(!isActive)}
                            />
                          }
                          componentsProps={{
                            typography: { fontSize: "12px", fontWeight: 600 },
                          }}
                          label="Is Active"
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              color="secondary"
                              size="small"
                              disabled={loading}
                              checked={isAdmin}
                              onChange={() => setIsAdmin(!isAdmin)}
                            />
                          }
                          componentsProps={{
                            typography: { fontSize: "12px", fontWeight: 600 },
                          }}
                          label="Is Admin"
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <div className={"users-table"}>
            {(loading || error) && (
              <Paper className={classes.usersPaper}>
                {loading && <CircularProgress variant={"indeterminate"} />}
                {error && <CustomError onClick={handleRetry} message={error} />}
              </Paper>
            )}
            {users && (
              <div>
                <div className={"flex flex-col gap-2"}>
                  <DataList
                    onRenderRow={(user: IUser, index: number) => (
                      <TableRow key={`key-${v4()}`}>
                        <TableCell sx={cellStyle}>{user.id}</TableCell>
                        <TableCell sx={cellStyle}>{user.username}</TableCell>
                        <TableCell
                          sx={cellStyle}
                        >{`${user.firstName} ${user.lastName}`}</TableCell>
                        <TableCell sx={cellStyle}>{user.email}</TableCell>
                        <TableCell sx={cellStyle}>
                          {format(parseISO(user.createdDate), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "48px",
                            paddingTop: "0",
                            paddingBottom: "0",
                          }}
                        >
                          <CustomButton
                            size="small"
                            variant="text"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit fontSize="small" />
                          </CustomButton>
                        </TableCell>
                      </TableRow>
                    )}
                    headers={headers}
                    items={userList}
                  />
                  {userList.length > 10 && (
                    <div className="flex justify-center mx-2">
                      <Paper>
                        <Pagination
                          count={userList.length}
                          page={page}
                          onChange={(event, page) => setPage(page)}
                        />
                      </Paper>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <AddUserContainter open={addUser} onClose={handleAddUser} />
        </div>
      </SomeContainer>
    </div>
  );
};

export default UserView;
