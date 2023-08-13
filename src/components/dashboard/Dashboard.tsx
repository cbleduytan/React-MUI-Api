import { Box, Button, colors, useTheme } from "@mui/material";
import React from "react";
import Header from "../Header";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Statbox from "../Statbox";
import Grid from "@mui/material/Unstable_Grid2";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box
        display={{ xs: "block", md: "flex" }}
        justifyContent={{ xs: "unset", md: "space-between" }}
        alignItems="center"
      >
        <Header
          title="DASHBOARD"
          subtitle="Welcome to your dashboard"
          fontSize={{ xs: "2rem", md: "1.5rem" }}
        />
        <Box
          marginTop={{ xs: "10px", md: "unset" }}
          marginLeft={{ xs: "unset", md: "10px" }}
          marginBottom={{ xs: "40px", md: "unset" }}
        >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Dowbload Reports
          </Button>
        </Box>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: colors.primary[400],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Statbox
              staboxProps={{
                title: "12,361",
                subtitle: "Emails Sent",
                progress: "0.75",
                increase: "14%",
                icon: (
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "1.5rem" }}
                  />
                ),
              }}
              fontSize={{ xs: "1.5rem", md: "1rem" }}
            />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: colors.primary[400],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Statbox
              staboxProps={{
                title: "12,361",
                subtitle: "Sales Obtained",
                progress: "0.5",
                increase: "+21%",
                icon: (
                  <PointOfSaleIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "1.5rem" }}
                  />
                ),
              }}
              fontSize={{ xs: "1.5rem", md: "1rem" }}
            />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: colors.primary[400],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Statbox
              staboxProps={{
                title: "32,441",
                subtitle: "New Clients",
                progress: "0.3",
                increase: "+5%",
                icon: (
                  <PersonAddIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "1.5rem" }}
                  />
                ),
              }}
              fontSize={{ xs: "1.5rem", md: "1rem" }}
            />
          </Box>
        </Grid>
      </Grid>
      {/* <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(3,1fr)" }}
        gap="20px"
        gridAutoRows="auto"
        sx={{
          gridTemplateAreas: {
            xs: `
                "item1"
                "item2"
                "item3"
                `,
            md: `
                "item1 item2 item3"
                `,
          },
        }}
      >
        <Box
          sx={{
            gridArea: {
              xs: "item1",
              md: "unset",
            },
            backgroundColor: colors.primary[400],
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "unset", md: "center" },
            textAlign: { xs: "unset", md: "center" },
          }}
        >
          <Statbox
            title="12,361"
            subtitle="Emails Sent"
            progress={0.75}
            increase="+14%"
            icon={
              <EmailIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "1.5rem",
                }}
              />
            }
            fontSize={{ xs: "1.5rem", md: "1rem" }}
          />
        </Box>

        <Box
          sx={{
            gridArea: {
              xs: "item2",
              md: "unset",
            },
            backgroundColor: colors.primary[400],
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "unset", md: "center" },
            textAlign: { xs: "unset", md: "center" },
          }}
        >
          <Statbox
            title="12,361"
            subtitle="Sales Obtained"
            progress={0.5}
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "1.5rem",
                }}
              />
            }
            fontSize={{ xs: "1.5rem", md: "1rem" }}
          />
        </Box>

        <Box
          sx={{
            gridArea: {
              xs: "item3",
              md: "unset",
            },
            backgroundColor: colors.primary[400],
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "unset", md: "center" },
            textAlign: { xs: "unset", md: "center" },
          }}
        >
          <Statbox
            title="32,441"
            subtitle="New Clients"
            progress={0.3}
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "1.5rem",
                }}
              />
            }
            fontSize={{ xs: "1.5rem", md: "1rem" }}
          />
        </Box>
      </Box> */}
    </Box>
  );
};

export default Dashboard;
