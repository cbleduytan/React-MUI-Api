import { Box, useTheme, IconButton, InputBase, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LoginIcon from "@mui/icons-material/Login";
import "./Topbar.css";
interface TopbarProps {
  setIsSidebar: () => void;
  searchId: number | null;
  setSearchId: (id: number | null) => void;
}

const Topbar: React.FC<TopbarProps> = ({ searchId, setSearchId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [tooltipTex, setTooltipText] = useState("");
  //   const [searchId, setSearchId] = useState<number | null>(null);
  console.log("searchId", searchId);

  const handleIconClick = () => {
    if (theme.palette.mode === "dark") {
      setTooltipText("Light");
    } else {
      setTooltipText("Dark");
    }
    colorMode.toggleColorMode();
  };

  const handleSearhChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = parseInt(e.target.value);
    if (!isNaN(valueInput)) {
      setSearchId(valueInput);
      console.log("valueInput", valueInput);
    } else {
      setSearchId(null);
    }
  };

  const handleSearch = (searchId: number | null) => {
    setSearchId(searchId);
  };
  const { toggleSidebar, broken, rtl } = useProSidebar();
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        {broken && !rtl && (
          <IconButton
            sx={{ margin: "0 6 0 2", justifySelf: "start" }}
            onClick={() => toggleSidebar()}
          >
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box
          display="flex"
          sx={{
            backgroundColor: colors.primary[400],
            padding: "0.2px",
            borderRadius: "1px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            value={searchId || ""}
            onChange={handleSearhChange}
            // value={searchId || ""}
          />
          <IconButton type="button" onClick={() => handleSearch(searchId)}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent="end">
        <Tooltip title={tooltipTex} placement="bottom">
          <IconButton onClick={handleIconClick}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notification">
          <IconButton className="notification-badge" data-count="10">
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Login">
          <IconButton>
            <LoginIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;
