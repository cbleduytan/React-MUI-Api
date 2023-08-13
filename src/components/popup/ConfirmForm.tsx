// ConfirmForm.tsx
import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmFormProps {
  open: boolean;
  onClose: () => void;
  type: string;
  status: string;
  message: string;
}

const ConfirmForm: React.FC<ConfirmFormProps> = ({
  open,
  onClose,
  type,
  status,
  message,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle>{type}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmForm;
