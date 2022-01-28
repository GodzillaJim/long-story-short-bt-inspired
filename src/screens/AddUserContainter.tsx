import React from "react";
import { useFormik } from "formik";
import { IUser } from "../data/Users";
import { string, object } from "yup";
import CustomDialog from "../components/CustomDialog";
import { IconButton, InputAdornment, TextField, FormGroup, FormControlLabel, Switch, Button } from "@mui/material";
import { format } from "date-fns";
import { ContentCopy } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import CustomToastify from "../components/CustomToastify";
import { toast } from 'react-toastify';

interface IAddUserContainer {
  open: boolean;
  onClose: () => void;
}
const useStyles = makeStyles({
  iconButton: {
    "&:focus": {
      outline: "none",
    },
  },
});
const AddUserContainter = (props: IAddUserContainer) => {
  const message = "This is required";
  const classes = useStyles();
  const { values, errors, touched, setFieldValue, handleSubmit, isValid } =
    useFormik<IUser>({
      initialValues: {
        id: "1",
        username: "",
        email: "",
        password: "password12345",
        firstName: "",
        lastName: "",
        isActive: false,
        isAdmin: false,
        createdOn: new Date(),
      },
      validationSchema: object().shape({
        username: string().required(message),
        email: string().required(message),
        firstName: string().required(message),
        lastName: string().required(message),
      }),
      onSubmit: (vals: IUser) => {
        //TODO: Implement create user
      },
    });
  const handleCopyPassword = async () => {
    await navigator
    .clipboard
    .writeText(values.password)
    .then(()=> {
        toast.success("Password copied successfully")
    })
    .catch(()=> {
        toast.error("Copying password failed!")
    })
  };
  return (
    <CustomDialog
      width="600px"
      title="Create User"
      onClose={props.onClose}
      open={props.open}
    >
      <div className="flex flex-col">
        <form noValidate onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7">
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <TextField
                    name="id"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    label="ID"
                    value={values.id}
                    size="small"
                    fullWidth
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    name="createdOn"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    label="Created On"
                    value={format(values.createdOn, "dd/MM/yyyy")}
                    size="small"
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <TextField
                    name="firstName"
                    variant="outlined"
                    label="First Name"
                    value={values.firstName}
                    onChange={(event) =>
                      setFieldValue("firstName", event.target.value)
                    }
                    size="small"
                    fullWidth
                    helperText={touched.firstName ? errors.firstName : undefined}
                  />
                </div>
                <div className="col-span-1">
                  <TextField
                    name="lastName"
                    variant="outlined"
                    label="Last Name"
                    value={values.lastName}
                    onChange={(event) =>
                      setFieldValue("lastName", event.target.value)
                    }
                    size="small"
                    fullWidth
                    helperText={touched.lastName ? errors.lastName : undefined}
                  />
                </div>
              </div>
            </div>
            <div>
              <TextField
                name="email"
                variant="outlined"
                label="Email"
                value={values.email}
                onChange={(event) => setFieldValue("email", event.target.value)}
                size="small"
                fullWidth
                helperText={touched.email ? errors.email : undefined}
              />
            </div>
            <div>
              <TextField
                name="password"
                variant="outlined"
                label="Password"
                value={values.password}
                onChange={(event) => setFieldValue("email", event.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton className={classes.iconButton} onClick={handleCopyPassword}>
                        <ContentCopy />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={"This is system generated"}
              />
            </div>
            <div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-1">
                        <FormGroup>
                            <FormControlLabel
                            control={
                                <Switch
                                color="primary"
                                disabled={false}
                                checked={values.isActive}
                                onChange={() => setFieldValue("isActive", !values.isActive)}
                                />
                            }
                            label="Is Active"
                            />
                        </FormGroup>
                    </div>
                    <div className="col-span-1">
                        <FormGroup>
                            <FormControlLabel
                            control={
                                <Switch
                                color="primary"
                                disabled={false}
                                checked={values.isAdmin}
                                onChange={() => setFieldValue("isAdmin", !values.isAdmin)}
                                />
                            }
                            label="Is Admin"
                            />
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-row gap-5 justify-end">
                    <div>
                        <Button color="primary" variant="outlined" onClick={props.onClose} >Cancel</Button>
                    </div>
                    <div>
                        <Button disabled={!isValid} color="primary" variant="contained" type="submit">Create</Button>
                    </div>
                </div>
            </div>
          </div>
        </form>
        <CustomToastify/>
      </div>
    </CustomDialog>
  );
};

export default AddUserContainter;
