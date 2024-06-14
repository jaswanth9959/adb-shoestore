import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../slices/customerApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
const defaultTheme = createTheme();

export default function ProfileScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const [firstname, setFirstname] = useState(userInfo.user.firstname || "");
  const [lastname, setLastname] = useState(userInfo.user.lastname || "");
  const [email, setEmail] = useState(userInfo.user.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(new Date(userInfo.user.dob) || null);
  const [phone, setPhone] = useState(userInfo.user.phone || "");
  const [address, setAddress] = useState(userInfo.user.address || "");
  const [city, setCity] = useState(userInfo.user.city || "");
  const [zip, setZip] = useState(userInfo.user.zip || "");
  const [country, setCountry] = useState(userInfo.user.country || "");
  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          userId: userInfo.user._id,
          firstname,
          lastname,
          email,
          phone,
          password,
          dob,
          address,
          city,
          zip,
          country,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        setPassword("");
        setConfirmPassword("");
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              My Profile
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={submitHandler}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="mobile"
                    label="Phone Number"
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Date Of Birth"
                    sx={{ width: "100%" }}
                    value={dayjs(dob)}
                    onChange={(newval) => setDob(newval)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Address"
                    label="Address"
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    fullWidth
                    id="zip"
                    label="Zip"
                    name="zip"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    defaultValue={email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "primary.light" }}
              >
                Update Profile
              </Button>
              {isLoading && (
                <Typography variant="subtitle2">Loading...</Typography>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
