import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import StoreIcon from "@mui/icons-material/Store";

import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
export default function Header() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    try {
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
          >
            <StoreIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shoe Store
          </Typography>
          {userInfo?.user?.role === "user" && (
            <Stack direction={"row"}>
              <Button color="inherit" onClick={() => navigate("/cart")}>
                Cart
              </Button>
              <Button color="inherit" onClick={() => navigate("/myorders")}>
                My Orders
              </Button>
              <Button color="inherit" onClick={() => navigate("/profile")}>
                My Profile
              </Button>
              <Button color="inherit" onClick={logoutHandler}>
                Logout
              </Button>
            </Stack>
          )}{" "}
          {!userInfo && (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
          {userInfo && userInfo?.user?.role !== "user" && (
            <Stack direction={"row"}>
              <Button color="inherit" onClick={logoutHandler}>
                Logout
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
