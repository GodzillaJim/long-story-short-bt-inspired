import {
  Paper,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { object, string } from 'yup';
import LoginImage from '../resources/wolf.jpg';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
interface ILogin {
  username: string;
  password: string;
}
const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { handleSubmit, values, errors, touched, setFieldValue } =
    useFormik<ILogin>({
      initialValues: { username: '', password: '' },
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: object().shape({
        username: string().required('Please provide a username'),
        password: string().required('Please provide a password'),
      }),
    });
  return (
    <Paper>
      <Grid flexDirection={'row'} container spacing="2">
        <Grid
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
          item
          xs={12}
          sm={12}
          md={6}>
          <form style={{ height: '100%' }} onSubmit={handleSubmit} noValidate>
            <Grid
              alignContent={'center'}
              justifyContent={'center'}
              container
              spacing="18"
              style={{ height: '100%' }}
              direction="column">
              <Grid item>
                <Typography textAlign={'center'} variant="h5">
                  Welcom Back
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  variant="outlined"
                  value={values.username}
                  label={'Username'}
                  name="username"
                  onChange={(e) =>
                    setFieldValue('username', e.target.value || '')
                  }
                  helperText={touched.username ? errors.username : undefined}
                />
              </Grid>
              <Grid item>
                <TextField
                  size="small"
                  variant="outlined"
                  value={values.password}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) =>
                    setFieldValue('password', e.target.value || '')
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}>
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
                <Button fullWidth type="submit" variant="contained">
                  Log In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <LoginImageContainer />
        </Grid>
      </Grid>
    </Paper>
  );
};

const LoginImageContainer = () => {
  return (
    <div
      className="image-dcontainer h-full"
      style={{
        backgroundImage: `url(${LoginImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '98vh',
        overflow: 'hidden',
        borderRadius: '8px',
      }}></div>
  );
};
export default LoginScreen;
