import {
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomError from "../components/CustomError";
import DefaultText from "../components/DefaultText";
import {
  activateUserAction,
  adminChangePasswordAction,
  changePasswordAction,
  deactivateUserAction,
  demoteAdminAction,
  getUserAction,
  makeAdminAction,
  updateUserAction,
} from "../redux/actions/UserActions";
import { RootState } from "../redux/combineReducers";
import { string, object, ref } from "yup";
import { toast } from "react-toastify";
import CustomToastify from "../components/CustomToastify";
import { IUser } from "../data/Users";
import { Home, People, Person } from "@mui/icons-material";
import TopSection from "../components/TopSection";
import CustomButton from "../components/CustomButton";
import useAuth from "../hooks/useAuth";
import {
  ACTIVATE_USER_RESET,
  DEACTIVATE_USER_RESET,
  DEMOTE_ADMIN_RESET,
  MAKE_ADMIN_RESET,
  CHANGE_PASSWORD_RESET,
} from "../redux/constants/UserConstants";
import { IRole } from "../types";
import { useStyles } from "../styles/styles";

const UserDetaisView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customClasses = useStyles();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const message = "This is required";

  const formik = useFormik<IUser>({
    initialValues: {
      id: "",
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isAdmin: false,
      isActive: false,
      createdOn: new Date(),
    },
    validationSchema: object().shape({
      firstName: string().required(message),
      lastName: string().required(message),
      username: string().required(message),
    }),
    onSubmit: (vals) => {
      dispatch(updateUserAction(vals));
    },
  });
  const { loading, error, user } = useSelector(
    (state: RootState) => state.user
  );
  const {
    loading: changing,
    error: passwordChangingError,
    success,
  } = useSelector((state: RootState) => state.changePassword);
  useEffect(() => {
    if (passwordChangingError) {
      toast.error(passwordChangingError, {
        onClose: () => dispatch({ type: CHANGE_PASSWORD_RESET }),
      });
    }
    if (success) {
      toast.success("Password changed successfully!", {
        onClose: () => dispatch({ type: CHANGE_PASSWORD_RESET }),
      });
    }
  }, [changing, passwordChangingError, success, dispatch]);
  const {
    loading: making,
    error: adminError,
    success: isAdmin,
  } = useSelector((state: RootState) => state.makeAdmin);
  useEffect(() => {
    if (adminError) {
      toast.error(adminError, {
        onClose: () => dispatch({ type: MAKE_ADMIN_RESET }),
      });
    }
    if (isAdmin) {
      toast.success("User is now an admin", {
        onClose: () => dispatch({ type: MAKE_ADMIN_RESET }),
      });
    }
  }, [making, adminError, isAdmin, dispatch]);
  useEffect(() => {
    if (!loading && !error && !user && id) {
      dispatch(getUserAction(id));
    }
    if (!id) {
      navigate("/users");
    }
  }, [loading, error, user, id, dispatch, navigate]);
  const {
    loading: demoting,
    error: demotingError,
    success: demoted,
  } = useSelector((state: RootState) => state.demoteAdmin);

  useEffect(() => {
    if (demoted) {
      toast.success("User is no longer admin", {
        onClose: () => dispatch({ type: DEMOTE_ADMIN_RESET }),
      });
    }
    if (demotingError) {
      toast.error(demotingError, {
        onClose: () => dispatch({ type: DEMOTE_ADMIN_RESET }),
      });
    }
  }, [demoting, demotingError, demoted, dispatch]);
  const {
    loading: activating,
    error: activationError,
    success: userIsActive,
  } = useSelector((state: RootState) => state.activateUser);
  useEffect(() => {
    if (activationError) {
      toast.error(activationError, {
        onClose: () => dispatch({ type: ACTIVATE_USER_RESET }),
      });
    }
    if (userIsActive) {
      toast.success("User is now active!", {
        onClose: () => dispatch({ type: ACTIVATE_USER_RESET }),
      });
    }
  }, [activating, activationError, userIsActive, dispatch]);
  const {
    loading: deActivating,
    error: deActivationError,
    success: userIsInactive,
  } = useSelector((state: RootState) => state.deactivateUser);
  useEffect(() => {
    if (deActivationError) {
      toast.error(deActivationError, {
        onClose: () => dispatch({ type: DEACTIVATE_USER_RESET }),
      });
    }
    if (userIsInactive) {
      toast.success("User is now Inactive!", {
        onClose: () => dispatch({ type: DEACTIVATE_USER_RESET }),
      });
    }
  }, [deActivating, deActivationError, userIsInactive, dispatch]);
  const {
    loading: updatingUser,
    error: userUpdateError,
    user: updatedUser,
  } = useSelector((state: RootState) => state.updateUser);
  useEffect(() => {
    if (userUpdateError) {
      toast.error(userUpdateError);
    }
    if (updatedUser) {
      toast.success("User updated successfully!");
    }
  }, [updatingUser, userUpdateError, updatedUser]);
  const handleRetry = () => {
    id && dispatch(getUserAction(id));
  };
  const handleMakeAdmin = () => {
    dispatch(makeAdminAction(user.id));
  };
  const handleDemote = () => {
    dispatch(demoteAdminAction(user.id));
  };
  const handleActivate = () => {
    dispatch(activateUserAction(user.id));
  };
  const handleDeactivate = () => {
    dispatch(deactivateUserAction(user.id));
  };
  const handleEdit = () => {
    user && formik.setValues(user);
    setIsEditing(!isEditing);
  };
  const { user: loggedUser } = useAuth();
  const canChangePassword = useMemo(() => {
    let temp = false;
    if (user) {
      temp = user.username === loggedUser;
    }
    return temp;
  }, [user, loggedUser]);

  const { values, errors, touched, setFieldValue, submitForm } = useFormik<{
    password: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (vals) => {
      const { password: oldPassword, newPassword } = vals;
      if (user.username === loggedUser) {
        dispatch(changePasswordAction({ oldPassword, newPassword }));
        return;
      }
      if (isAdmin) {
        dispatch(
          adminChangePasswordAction(user.id, { oldPassword, newPassword })
        );
        return;
      }
    },
    validationSchema: object().shape({
      password: string().required(message),
      newPassword: string().required(message),
      confirmPassword: string()
        .required(message)
        .oneOf(
          [ref("newPassword"), null],
          "new password and confirm password must match"
        ),
    }),
  });
  const items = [
    {
      name: "Admin",
      link: "/",
      isActive: false,
      icon: <Home className={customClasses.icon} />,
    },
    {
      name: "Users",
      link: "/users",
      isActive: false,
      icon: <People className={customClasses.icon} />,
    },
    {
      name: user ? user.firstName : "",
      link: `/users/${user ? user.id : ""}`,
      isActive: true,
      icon: <Person className={customClasses.icon} />,
    },
  ];
  const userIsAdmin = useMemo(() => {
    return user
      ? Boolean(
          user.roles.find((role: IRole) => role.roleName === "ROLE_ADMIN")
        )
      : false;
  }, [user]);
  useEffect(() => {
    console.log(userIsAdmin);
  }, [userIsAdmin, user]);
  return (
    <div className="m-3">
      <div className="flex flex-row justify-between my-3">
        <TopSection breadCrumbsOnly items={items} />
        <div>
          <CustomButton onClick={handleEdit} variant="outlined" size="small">
            {isEditing ? "Cancel" : "Edit"}
          </CustomButton>
        </div>
      </div>
      <div>
        {(loading || user) && (
          <div className="flex justify-center">
            {loading && (
              <div className="text-center mt-5">
                {<CircularProgress size={20} variant="indeterminate" />}
              </div>
            )}
            {error && (
              <div>{<CustomError onClick={handleRetry} message={error} />}</div>
            )}
          </div>
        )}
        {user && (
          <div className="grid grid-cols-5 gap-3 ">
            <div className="col-span-3">
              <Paper className="p-3">
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-1">
                      <DefaultText label="ID" value={user.id} />
                    </div>
                    <div className="col-span-1">
                      <DefaultText
                        label="Created On"
                        value={format(parseISO(user.createdDate), "dd/MM/yyyy")}
                      />
                    </div>
                  </div>
                  <Divider />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      {!isEditing && (
                        <DefaultText
                          label="First Name"
                          value={user.firstName}
                        />
                      )}
                      {isEditing && (
                        <TextField
                          name="firstName"
                          variant="outlined"
                          label="First Name"
                          value={formik.values.firstName}
                          onChange={(event) =>
                            formik.setFieldValue(
                              "firstName",
                              event.target.value
                            )
                          }
                          size="small"
                          fullWidth
                          helperText={
                            formik.touched.firstName
                              ? formik.errors.firstName
                              : undefined
                          }
                          disabled={updatingUser}
                        />
                      )}
                    </div>
                    <div className="col-span-1">
                      {isEditing && (
                        <TextField
                          name="lastName"
                          variant="outlined"
                          label="Last Name"
                          value={formik.values.lastName}
                          onChange={(event) =>
                            formik.setFieldValue("lastName", event.target.value)
                          }
                          size="small"
                          fullWidth
                          disabled={updatingUser}
                          helperText={
                            formik.touched.lastName
                              ? formik.errors.lastName
                              : undefined
                          }
                        />
                      )}
                      {!isEditing && (
                        <DefaultText label="Last Name" value={user.lastName} />
                      )}
                    </div>
                  </div>
                  <Divider />
                  <div>
                    <DefaultText label="Email" value={user.email} />
                  </div>
                  <Divider />
                  <div>
                    {isEditing && (
                      <TextField
                        name="username"
                        variant="outlined"
                        label="Username"
                        value={formik.values.username}
                        onChange={(event) =>
                          formik.setFieldValue("username", event.target.value)
                        }
                        size="small"
                        style={{ width: "60%" }}
                        disabled={
                          updatingUser || (!canChangePassword && !user.isAdmin)
                        }
                        helperText={
                          formik.touched.username
                            ? formik.errors.username
                            : undefined
                        }
                      />
                    )}
                    {!isEditing && (
                      <DefaultText label="Username" value={user.username} />
                    )}
                  </div>
                  <Divider />
                  <div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-7">
                        <div>
                          <CustomCheckbox
                            color="primary"
                            checked={user.active}
                            disabled={false}
                            onChange={() => {}}
                            label={"Is Active"}
                            readOnly
                          />
                        </div>
                        <div>
                          <CustomCheckbox
                            color="primary"
                            checked={Boolean(
                              user.roles.find(
                                (role: IRole) => role.roleName === "ROLE_ADMIN"
                              )
                            )}
                            disabled={false}
                            onChange={() => {}}
                            label={"Is Admin"}
                            readOnly
                          />
                        </div>
                      </div>
                      {isEditing && (
                        <div>
                          <CustomButton
                            disabled={!(canChangePassword || isAdmin)}
                            onClick={formik.submitForm}
                          >
                            Save Changes
                          </CustomButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
            <div className="col-span-2">
              <div className="flex flex-col gap-3">
                <Paper className="p-3">
                  <div className="flex flex-col mx-4 gap-5">
                    <div>
                      <Typography variant="h6">Change Password</Typography>
                    </div>
                    <div>
                      <TextField
                        size="small"
                        disabled={
                          changing || (!canChangePassword && !user.isAdmin)
                        }
                        label="Current Password"
                        value={values.password}
                        onChange={(event) =>
                          setFieldValue("password", event.target.value)
                        }
                        helperText={
                          touched.password ? errors.password : undefined
                        }
                        fullWidth
                      />
                    </div>
                    <div>
                      <TextField
                        size="small"
                        disabled={
                          changing || !(canChangePassword || user.isAdmin)
                        }
                        label="New Password"
                        value={values.newPassword}
                        onChange={(event) =>
                          setFieldValue("newPassword", event.target.value)
                        }
                        helperText={
                          touched.newPassword ? errors.newPassword : undefined
                        }
                        fullWidth
                      />
                    </div>
                    <div>
                      <TextField
                        size="small"
                        disabled={
                          changing || !(canChangePassword || user.isAdmin)
                        }
                        label="Confirm Password"
                        value={values.confirmPassword}
                        onChange={(event) =>
                          setFieldValue("confirmPassword", event.target.value)
                        }
                        helperText={
                          touched.confirmPassword
                            ? errors.confirmPassword
                            : undefined
                        }
                        fullWidth
                      />
                    </div>
                    <div className="flex justify-end">
                      {changing && (
                        <CircularProgress variant="indeterminate" size={20} />
                      )}
                      {!changing && (
                        <CustomButton
                          onClick={submitForm}
                          size="small"
                          variant="outlined"
                          disabled={
                            changing || !(canChangePassword || user.isAdmin)
                          }
                        >
                          Change
                        </CustomButton>
                      )}
                    </div>
                  </div>
                </Paper>
                <Paper className="p-3">
                  <div className="flex flex-row gap-4 justify-center">
                    <div className="activate-button">
                      {(activating || deActivating) && (
                        <CircularProgress variant="indeterminate" size={20} />
                      )}
                      {!activating && !deActivating && (
                        <CustomButton
                          onClick={() =>
                            user.active ? handleDeactivate() : handleActivate()
                          }
                          variant="contained"
                        >
                          {user.active ? "Deactivate" : "Activate"}
                        </CustomButton>
                      )}
                    </div>
                    <div className="make-admin-button">
                      {(making || demoting) && (
                        <CircularProgress variant="indeterminate" size={20} />
                      )}
                      {!making && !demoting && (
                        <CustomButton
                          onClick={() =>
                            userIsAdmin ? handleDemote() : handleMakeAdmin()
                          }
                          variant="contained"
                        >
                          {userIsAdmin ? "Demote" : "Make Admin"}
                        </CustomButton>
                      )}
                    </div>
                  </div>
                </Paper>
              </div>
            </div>
          </div>
        )}
      </div>
      <CustomToastify />
    </div>
  );
};

export default UserDetaisView;
