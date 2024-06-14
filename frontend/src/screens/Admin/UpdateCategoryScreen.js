import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} from "../../slices/categoryApiSlice";
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
function UpdateCategoryScreen() {
  const { id: catId } = useParams();
  const [name, setName] = useState("");
  const { data: category, refetch } = useGetCategoryQuery(catId);

  const navigate = useNavigate();
  const [updateItem, { isLoading: loadingCreate }] =
    useUpdateCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateItem({ catId, name }).unwrap();
      refetch();
      toast.success("Category Update Successfull!");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);
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
            Update Category Form
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
              Update
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

export default UpdateCategoryScreen;
