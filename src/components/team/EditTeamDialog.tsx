import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import "./EditTeamDialog.css";
import { editUser } from "../../../data/services/api";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
interface EditTeamDialogProps {
  user: API.UserForm | null;
  open: boolean;
  onClose: (updatedUser: API.UserForm) => void;
}

const emptyUser: API.UserForm = {
  userId: 0,
  userName: "",
  age: 0,
  email: "",
  phoneNumber: "",
};
const EditTeamDialog: React.FC<EditTeamDialogProps> = ({
  user: initialUser = emptyUser,
  open,
  onClose,
}) => {
  const [editedUser, setEditedUser] = useState<API.UserForm | null>(
    initialUser
  );

  // Thêm biến state để lưu trữ giá trị editedUserId
  const [editedUserId, setEditedUserId] = useState<number | null>(null);

  console.log("editedUser", editedUser);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    setEditedUser(initialUser);
    console.log("initialUser", initialUser);

    // Lưu giá trị userId vào editedUserId
    setEditedUserId(initialUser?.userId || null);
  }, [initialUser]);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ageValue = parseInt(e.target.value, 10);
    if (editedUser) {
      console.log("editedUser", editedUser);

      setEditedUser((preUser) => ({
        ...preUser,
        age: ageValue,
      }));
    }
  };

  const handleSave = () => {
    if (
      editedUserId !== null &&
      editedUser &&
      editedUser.userName &&
      editedUser.age !== null &&
      editedUser.email &&
      editedUser.phoneNumber
    ) {
      editUser(editedUserId, editedUser)
        .then((updatedUser) => {
          console.log("updatedUser", updatedUser);
          onClose(updatedUser);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      console.error("Required fields are missing");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        hideBackdrop
      >
        <DialogTitle id="alert-dialog-title">
          {`Edit a user with Id: ${editedUser?.userId}`}
        </DialogTitle>
        <DialogContent
          className="dialog-container"
          style={{ overflow: "hidden" }}
        >
          <div style={{ width: "300px", height: "200px" }}>
            <TextField
              sx={{ color: colors.grey[100] }}
              fullWidth
              autoFocus
              margin="dense"
              label="User name"
              value={editedUser?.userName || ""}
              onChange={(e) =>
                setEditedUser({ ...editedUser, userName: e.target.value })
              }
              variant="standard"
            />

            <TextField
              sx={{ color: colors.grey[100] }}
              required
              fullWidth
              autoFocus
              margin="dense"
              label="Age"
              value={editedUser?.age || ""}
              onChange={handleAgeChange}
              variant="standard"
            />

            <TextField
              sx={{ color: colors.grey[100] }}
              fullWidth
              autoFocus
              margin="dense"
              label="Email"
              value={editedUser?.email || ""}
              onChange={(e) => {
                setEditedUser({ ...editedUser, email: e.target.value });
              }}
              variant="standard"
            />

            <TextField
              sx={{ color: colors.grey[100] }}
              fullWidth
              autoFocus
              margin="dense"
              label="Phone number"
              value={editedUser?.phoneNumber || ""}
              onChange={(e) => {
                setEditedUser({ ...editedUser, phoneNumber: e.target.value });
              }}
              variant="standard"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: colors.blueAccent[400] }}
            onClick={() => handleSave()}
          >
            Update
          </Button>
          <Button
            onClick={() => editedUser !== null && onClose(editedUser)}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTeamDialog;
