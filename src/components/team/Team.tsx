import { Box, Tooltip, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header from "../Header";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRowModel,
} from "@mui/x-data-grid";
import { editUser, getUserById, getUsers } from "../../../data/services/api";
import EditTeamDialog from "./EditTeamDialog";
import { useNavigate } from "react-router-dom";

interface TeamProps {
  searchId: number | null;
}
const Team: React.FC<TeamProps> = ({ searchId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedUserData, setSelectedUserData] = useState<API.UserForm[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<API.UserForm | null>(null);
  console.log("selectedUserData", selectedUserData);

  console.log("editingUser", editingUser);
  const navigate = useNavigate();
  useEffect(() => {
    getUsers()
      .then((users) => {
        // Cập nhật danh sách user lấy từ API vào state
        setSelectedUserData(users);
      })
      .catch((error) => {
        console.error(error); // Xử lý lỗi nếu có
      });
  }, []);

  const handleEdit = async (userId: number) => {
    // Tìm người dùng cụ thể trong mảng selectedUserData dựa trên userId
    let editedUserIndex = selectedUserData.findIndex(
      (user) => user.userId === userId
    );
    if (editedUserIndex !== -1) {
      const editedUserArray = await getUserById(userId);
      const editedUser = editedUserArray[0]; // Lấy đối tượng đầu tiên trong mảng
      const updatedUserData = [...selectedUserData];
      updatedUserData[editedUserIndex] = editedUser;
      setSelectedUserData(updatedUserData);
      setEditingUser(editedUser);
      setIsEditDialogOpen(true);
    } else {
      console.log(`User with userId ${userId} not found.`);
    }
  };

  const handleEditDialogClose = (updatedUser: API.UserForm) => {
    // Cập nhật dữ liệu ngay lập tức trên phía frontend
    const updatedUserData = [...selectedUserData];
    const updatedUserIndex = updatedUserData.findIndex(
      (user) => user.userId === updatedUser.userId
    );
    if (updatedUserIndex !== -1) {
      updatedUserData[updatedUserIndex] = updatedUser;
      setSelectedUserData(updatedUserData);
    }

    // Kiểm tra updatedUser.userId có tồn tại trước khi gọi hàm editUser
    if (updatedUser.userId) {
      editUser(updatedUser.userId, updatedUser)
        .then((updatedUser) => {
          console.log("updatedUser", updatedUser);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }

    // Đóng dialog
    setIsEditDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 200, sortable: false },
    {
      field: "name",
      headerName: "User name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      width: 100,
      align: "left",
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const user = selectedUserData.find((u) => u.userId === params.id);
        return (
          <>
            <EditTeamDialog
              key={user?.userId}
              user={editingUser}
              open={isEditDialogOpen}
              onClose={handleEditDialogClose}
            />
            <Tooltip title="Edit">
              <EditIcon
                onClick={() => handleEdit(params.row.id)}
                style={{ cursor: "pointer", marginRight: 10 }}
              />
            </Tooltip>
            {/* <Tooltip title="Delete">
            <DeleteIcon
              style={{ cursor: "pointer", marginRight: 10 }}
              onClick={() => handleDelete(params.id)}
            />
          </Tooltip>
          <Tooltip title="View">
            <VisibilityIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleView(params.id)}
            />
          </Tooltip> */}
          </>
        );
      },
    },
  ];

  const rows: GridRowsProp = selectedUserData
    .filter((user) => searchId === null || user.userId === searchId)
    .map((user) => ({
      id: user.userId,
      name: user.userName,
      age: user.age,
      email: user.email,
      phone: user.phoneNumber,
    })) as GridRowModel[];

  const addedIds: number[] = [];

  // Kiểm tra và log giá trị id trong danh sách rows
  rows.forEach((row: GridRowModel) => {
    if (addedIds.includes(row.id)) {
      console.error(`Duplicate id found: ${row.id}`);
    } else {
      addedIds.push(row.id);
      console.log(`Added id: ${row.id}`);
    }
  });

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="TEAM"
          subtitle="welcome to you Team"
          fontSize={{ xs: "2rem", md: "1.5rem" }}
        />
      </Box>
      <Box
        m="8px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Team;
