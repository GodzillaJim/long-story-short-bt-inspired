import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import LoginImage from "../resources/wolf.jpg";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/actions/AuthAction";
import { RootState } from "../redux/combineReducers";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams, useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import "react-toastify/dist/ReactToastify.css";
interface ILogin {
  username: string;
  password: string;
}
const useStyles = makeStyles({
  headerText: {
    fontFamily: "Source Sans Pro",
  },
});
const LoginScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { error, loading, authToken } = useSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    const notLoggedIn = authToken === "" || authToken === null;
    if (!notLoggedIn) {
      toast.success("Logged in successful. Redirecting now!", {
        onClose: () => {
          const redirect = searchParams.get("redirect");
          if (redirect) {
            return navigate(redirect);
          }
          return navigate("/home");
        },
      });
    }
  }, [authToken, loading, error, searchParams, navigate]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    setSubmitting,
  } = useFormik<ILogin>({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginAction({ ...values }));
      setSubmitting(!isSubmitting);
    },
    validationSchema: object().shape({
      username: string().required("Please provide a username"),
      password: string().required("Please provide a password"),
    }),
  });
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <Grid flexDirection={"row"} container spacing="2">
        <Grid
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
          item
          xs={12}
          sm={12}
          md={6}
        >
          <form style={{ height: "100%" }} onSubmit={handleSubmit} noValidate>
            <Grid
              alignContent={"center"}
              justifyContent={"center"}
              container
              spacing="18"
              style={{ height: "100%" }}
              direction="column"
            >
              {loading && (
                <Grid style={{ marginBottom: "50px" }} item>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    direction="column"
                  >
                    <Grid style={{ margin: "auto" }} item>
                      <CircularProgress color="secondary" />
                    </Grid>
                    <Grid item>
                      <Typography
                        color="secondary"
                        className={classes.headerText}
                      >
                        Logging you in
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item>
                <Typography
                  className={classes.headerText}
                  textAlign={"center"}
                  variant="h5"
                >
                  Welcome Back
                </Typography>
              </Grid>
              {error && (
                <Grid item>
                  <Typography
                    className={classes.headerText}
                    textAlign={"center"}
                    color="red"
                    variant="body1"
                  >
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <TextField
                  disabled={loading}
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={values.username}
                  label={"Username"}
                  name="username"
                  color="secondary"
                  onChange={(e) =>
                    setFieldValue("username", e.target.value || "")
                  }
                  helperText={touched.username ? errors.username : undefined}
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled={loading}
                  size="small"
                  variant="outlined"
                  value={values.password}
                  label="Password"
                  color="secondary"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setFieldValue("password", e.target.value || "")
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                            <VisibilityOffOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <CustomButton
                  disabled={loading}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Log In
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <LoginImageContainer />
        </Grid>
      </Grid>
    </div>
  );
};

const LoginImageContainer = () => {
  return (
    <div
      className="image-dcontainer h-full"
      style={{
        backgroundImage: `url(${LoginImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      <div
        style={{ backgroundColor: "rgb(93 65 126 / 40%)" }}
        className="overlay h-full w-full"
      ></div>
    </div>
  );
};
export default LoginScreen;
