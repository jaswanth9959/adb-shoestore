import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddCategoryMutation } from "../../slices/categoryApiSlice";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";

const defaultTheme = createTheme();
function AddCategoryScreen() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const [AddItem, { isLoading: loadingCreate }] = useAddCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddItem({ name }).unwrap();
      toast.success("Category Addition Successfull!");
      navigate("/admin/categories");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="contained" onClick={() => navigate("/admin/categories")}>
        Back to Categories
      </Button>
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
            Add Category Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="cat"
              label="Category Name"
              name="name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "primary.light" }}
            >
              Add
            </Button>
            {loadingCreate && (
              <Typography variant="body2">Loading...</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddCategoryScreen;
