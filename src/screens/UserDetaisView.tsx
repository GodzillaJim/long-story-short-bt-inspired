import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomError from "../components/CustomError";
import DefaultText from "../components/DefaultText";
import {
  activateUserAction,
  changePasswordAction,
  deactivateUserAction,
  demoteAdminAction,
  getUserAction,
  makeAdminAction,
} from "../redux/actions/UserActions";
import { RootState } from "../redux/combineReducers";
import { string, object, ref } from "yup";
import { toast } from "react-toastify";
import CustomToastify from "../components/CustomToastify";
import { IUser } from "../data/Users";

const UserDetaisView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const message = "This is required";
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
      const { password, newPassword } = vals;
      dispatch(changePasswordAction({ password, newPassword }));
    },
    validationSchema: object().shape({
      password: string().required(message),
      newPassword: string().required(message),
      confirmPassword: string()
        .required(message)
        .oneOf([ref("password"), null], "Passwords must match"),
    }),
  });
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
    onSubmit: (vals) => {},
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
      toast.error(passwordChangingError);
    }
    if (success) {
      toast.success("Password changed successfully!");
    }
  }, [changing, passwordChangingError, success]);
  const {
    loading: making,
    error: adminError,
    success: isAdmin,
  } = useSelector((state: RootState) => state.makeAdmin);
  useEffect(() => {
    if (adminError) {
      toast.error(adminError);
    }
    if (isAdmin) {
      toast.success("User is now an admin");
    }
  }, [making, adminError, isAdmin]);
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
      toast.success("User is no longer admin");
    }
    if (demotingError) {
      toast.error(demotingError);
    }
  }, [demoting, demotingError, demoted]);
  const {
    loading: activating,
    error: activationError,
    success: userIsActive,
  } = useSelector((state: RootState) => state.activateUser);
  useEffect(() => {
    if (activationError) {
      toast.error(activationError);
    }
    if (userIsActive) {
      toast.success("User is now active!");
    }
  }, [activating, activationError, userIsActive]);
  const {
    loading: deActivating,
    error: deActivationError,
    success: userIsInactive,
  } = useSelector((state: RootState) => state.deactivateUser);
  useEffect(() => {
    if (deActivationError) {
      toast.error(deActivationError);
    }
    if (userIsInactive) {
      toast.success("User is now active!");
    }
  }, [deActivating, deActivationError, userIsInactive]);
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
  return (
    <div className="m-3">
      <div className="flex justify-end my-3">
        <div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="outlined"
            size="small"
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>
      <div>
        {(loading || user) && (
          <div className="flex justify-center">
            {loading && (
              <div className="text-center mt-5">
                {<CircularProgress variant="indeterminate" />}
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
                        value={format(user.createdOn, "dd/MM/yyyy")}
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
                      { isEditing &&  <TextField
                    name="firstName"
                    variant="outlined"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={(event) =>
                      formik.setFieldValue("firstName", event.target.value)
                    }
                    size="small"
                    fullWidth
                    helperText={
                      formik.touched.firstName ? formik.errors.firstName : undefined
                    }
                    disabled={loading}
                  /> }
                    </div>
                    <div className="col-span-1">
                      <DefaultText label="Last Name" value={user.lastName} />
                    </div>
                  </div>
                  <Divider />
                  <div>
                    <DefaultText label="Email" value={user.email} />
                  </div>
                  <Divider />
                  <div>
                    <DefaultText label="Username" value={user.username} />
                  </div>
                  <Divider />
                  <div>
                    <div className="flex flex-row gap-7">
                      <div>
                        <CustomCheckbox
                          color="primary"
                          checked={user.isActive}
                          disabled={false}
                          onChange={() => {}}
                          label={"Is Active"}
                        />
                      </div>
                      <div>
                        <CustomCheckbox
                          color="primary"
                          checked={user.isAdmin}
                          disabled={false}
                          onChange={() => {}}
                          label={"Is Admin"}
                        />
                      </div>
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
                        disabled={changing}
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
                        disabled={changing}
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
                        disabled={changing}
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
                        <Button
                          onClick={submitForm}
                          size="small"
                          variant="outlined"
                        >
                          Change
                        </Button>
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
                        <Button
                          onClick={() =>
                            user.isActive
                              ? handleDeactivate()
                              : handleActivate()
                          }
                          variant="contained"
                        >
                          {user.isActive ? "Deactivate" : "Activate"}
                        </Button>
                      )}
                    </div>
                    <div className="make-admin-button">
                      {(making || demoting) && (
                        <CircularProgress variant="indeterminate" size={20} />
                      )}
                      {!making && !demoting && (
                        <Button
                          onClick={() =>
                            user.isAdmin ? handleDemote() : handleMakeAdmin()
                          }
                          variant="contained"
                        >
                          {user.isAdmin ? "Demote" : "Make Admin"}
                        </Button>
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
