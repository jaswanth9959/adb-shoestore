import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { saveShippingAddress } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

function DeliveryScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [address, setAddress] = useState(userInfo.user.address || "");
  const [city, setCity] = useState(userInfo.user.city || "");
  const [zip, setZip] = useState(userInfo.user.zip || "");
  const [country, setCountry] = useState(userInfo.user.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, zip, country }));
    navigate("/payment");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <Typography component="h1" variant="h4">
            Shipping Address
          </Typography>
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="Address"
              autoComplete="address"
              autoFocus
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              name="city"
              autoComplete="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="zip"
              label="Zip"
              name="zip"
              autoComplete="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="country"
              name="country"
              autoComplete="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "primary.light" }}
            >
              Proceed
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default DeliveryScreen;
