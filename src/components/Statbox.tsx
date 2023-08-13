import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

interface StaboxProps {
  title: string;
  subtitle: string;
  icon: any;
  increase: any;
  progress: string;
}
interface Props {
  staboxProps: StaboxProps;
  fontSize?: string | { xs: string; md: string };
}
const Statbox: React.FC<Props> = ({ staboxProps, fontSize }) => {
  const { title, subtitle, icon, increase, progress } = staboxProps;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" m="0 30px" p="12px 0">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: colors.grey[100],
              marginLeft: "10px",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Typography
          variant="h5"
          sx={{
            color: colors.greenAccent[500],
            marginTop: "10px",
            // fontSize: StaboxProps.fontSize,
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default Statbox;
