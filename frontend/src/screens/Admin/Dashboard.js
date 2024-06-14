import React from "react";
import { Stack, Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pt: 8,
          mx: "auto",
          justifyContent: "space-evenly",
        }}
      >
        <Typography variant="h4">
          Welcome{" "}
          {userInfo.user.role === "admin" ? "Admin" : "Delivery Partner"}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "495px",
          mx: "auto",
          justifyContent: "space-evenly",
        }}
      >
        {userInfo.user.role === "admin" ? (
          <Stack direction="row" spacing={3} sx={{ display: "block" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/shoes")}
            >
              Manage Shoes
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/orders")}
            >
              Manage Orders
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/staff")}
            >
              Manage Staff
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/categories")}
            >
              Manage Categories
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/customers")}
            >
              View Customers
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={3} sx={{ display: "block" }}>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/readyorders")}
            >
              View Ready Orders
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/staffprofile")}
            >
              Manage My Profile
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/deliveredbyme")}
            >
              View Orders Delivered By Me
            </Button>
          </Stack>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
