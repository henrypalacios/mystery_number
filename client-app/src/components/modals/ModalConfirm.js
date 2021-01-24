import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const ConfirmingActions = ({ title, text, buttonText, onClick, activate }) => {
  const [open, setOpen] = useState(false);
  const onShowConfirm = () => {
    setOpen(true);
  };
  const onConfirm = () => {
    setOpen(false);
    onClick();
  };

  useEffect(() => {
    setOpen(activate);
  }, []);

  return (
    <Fragment>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onConfirm} color="primary">
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

ConfirmingActions.defaultProps = {
  title: "Delete",
  text: "Are you sure you want to delete?",
  buttonText: "Confirm",
  onClick: null,
  activate: false,
};

export default ConfirmingActions;
