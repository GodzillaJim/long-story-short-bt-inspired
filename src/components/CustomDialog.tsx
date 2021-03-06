import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MDBModal, MDBModalHeader, MDBModalBody } from "mdbreact";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface ICustomDialog {
  open: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
  width?: string;
}
export const ExtendedDialog = (props: ICustomDialog) => {
  return (
    <MDBModal size="lg" isOpen={props.open} centered toggle={props.onClose}>
      <MDBModalHeader toggle={props.onClose}>{props.title}</MDBModalHeader>
      <MDBModalBody>{props.children}</MDBModalBody>
    </MDBModal>
  );
};
export default function CustomDialog(props: ICustomDialog) {
  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {props.title}
        </BootstrapDialogTitle>
        <DialogContent style={{ width: props.width || "500px" }} dividers>
          {props.children}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
