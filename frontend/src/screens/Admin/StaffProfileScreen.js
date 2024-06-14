import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStaffprofileMutation } from "../../slices/staffApiSlice";
import { toast } from "react-toastify";
const defaultTheme = createTheme();

export default function StaffProfileScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const [firstname, setFirstname] = useState(userInfo.user.firstname);
  const [lastname, setLastname] = useState(userInfo.user.lastname);
  const [email, setEmail] = useState(userInfo.user.email);
  const [password, setPassword] = useState("");
  const [ssn, setSsn] = useState(userInfo.user.ssn);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState(new Date(userInfo.user.dob) || null);
  const [phone, setPhone] = useState(userInfo.user.phone);
  const navigate = useNavigate();

  const [register, { isLoading }] = useStaffprofileMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("passwords did not match!");
    } else {
      try {
        await register({
          staffId: userInfo.user._id,
          firstname,
          lastname,
          email,
          password,
          phone,
          dob,
          ssn,
          role: "delivery",
        }).unwrap();
        toast.success("Staff Profile Update!");
        navigate("/admin/staff");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" onClick={() => navigate("/admin/dashboard")}>
        Dashboard
      </Button>
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
              Staff Profile Form
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
                    value={firstname}
                    autoFocus
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
                    value={lastname}
                    autoComplete="family-name"
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
                    label="Date of Birth"
                    sx={{ width: "100%" }}
                    value={dayjs(dob)}
                    onChange={(newval) => setDob(newval)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="ssn"
                    label="SSN"
                    name="ssn"
                    value={ssn}
                    onChange={(e) => setSsn(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
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
                Update
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
