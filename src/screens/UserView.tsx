import {
  CircularProgress,
  Paper,
  TableRow,
  TableCell,
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch,
  Pagination,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Person, Home, Edit } from "@mui/icons-material";
import { SomeContainer } from "./Dashboard";
import TopSection from "../components/TopSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/combineReducers";
import { getAllUsersAction } from "../redux/actions/UserActions";
import { makeStyles } from "@mui/styles";
import CustomError from "../components/CustomError";
import DataList from "../components/DataList";
import { IUser } from "../data/Users";
import { v4 } from "uuid";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  usersPaper: {
    height: "calc(100vh - 100px)",
    textAlign: "center",
    paddingTop: "16px",
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
  const classes = useStyles();
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
      icon: <Home sx={{ mr: 0.5 }} fontSize="medium" />,
    },
    {
      name: "User",
      link: "/users",
      isActive: true,
      icon: <Person sx={{ mr: 0.5 }} fontSize="medium" />,
    },
  ];

  const handleAddUser = () => {};
  const handleRetry = () => {
    dispatch(getAllUsersAction());
  };
  const userList = useMemo(() => {
    let temp = users || [];
    const start = page * 10 - 10;
    temp = temp.slice(start, start + 10);
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
    temp = temp.filter((user: IUser) => user.isAdmin === isAdmin);
    temp = temp.filter((user: IUser) => user.isActive === isActive);
    return temp;
  }, [users, page, name, email, isActive, isAdmin]);

  const handleEdit = (user: IUser) => {
    navigate(`/users/${user.id}`);
  };
  const headers = ["", "ID", "Username", "Name", "Email", "Created On", ""];
  const cellStyle = {
    fontFamily: "Sans Serif",
    width: "calc((100% - 96px) / 5)",
    padding: 0,
  };
  return (
    <div>
      <SomeContainer>
        <div className={"flex flex-col gap-5"}>
          <TopSection
            items={items}
            actionText={"Add User"}
            onClick={handleAddUser}
          />
          <div className="table-search">
            <Paper>
              <div className="grid grid-cols-3 px-5 py-3 gap-5">
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
                  <div className="flex flex-row gap-5">
                    <div>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              color="secondary"
                              disabled={loading}
                              checked={isActive}
                              onChange={() => setIsActive(!isActive)}
                            />
                          }
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
                              disabled={loading}
                              checked={isAdmin}
                              onChange={() => setIsAdmin(!isAdmin)}
                            />
                          }
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
                        <TableCell className="px-2" sx={{ width: "48px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={cellStyle}>{user.id}</TableCell>
                        <TableCell sx={cellStyle}>{user.username}</TableCell>
                        <TableCell
                          sx={cellStyle}
                        >{`${user.firstName} ${user.lastName}`}</TableCell>
                        <TableCell sx={cellStyle}>{user.email}</TableCell>
                        <TableCell sx={cellStyle}>
                          {format(user.createdOn, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell sx={{ width: "48px" }}>
                          <IconButton onClick={() => handleEdit(user)}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                    headers={headers}
                    items={userList}
                  />
                  { userList.length > 10 && <div className="flex justify-center mx-2">
                    <Paper>
                      <Pagination count={userList.length} page={page} onChange={(event, page)=>setPage(page)} />
                    </Paper>
                  </div>}
                </div>
              </div>
            )}
          </div>
        </div>
      </SomeContainer>
    </div>
  );
};

export default UserView;
