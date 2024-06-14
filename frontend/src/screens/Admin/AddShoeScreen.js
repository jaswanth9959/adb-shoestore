import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";

import {
  useCreateShoeMutation,
  useUploadImageMutation,
} from "../../slices/shoesApiSlice";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const defaultTheme = createTheme();

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddShoeScreen() {
  const { data: categories } = useGetCategoriesQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [sizeoptions, setSizeoptions] = useState("");
  const navigate = useNavigate();

  const [create, { isLoading }] = useCreateShoeMutation();
  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const sizeOptions = sizeoptions.split(",").map((o) => o.trim());
    try {
      await create({
        userId: userInfo.user._id,
        name,
        brand,
        gender,
        category,
        price,
        description,
        color,
        stock,
        image,
        sizeOptions,
      }).unwrap();
      toast.success("Shoe Addition Successful!");
      navigate("/admin/shoes");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      window.alert(res.message);
      setImage(res.image);
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => navigate("/admin/shoes")}>
        Back to Shoes
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
              Shoe Addition Form
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
                    label="Name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Brand"
                    name="lastName"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={category}
                      label="Category"
                      onChange={handleChange}
                    >
                      {categories?.map((cat) => (
                        <MenuItem value={cat._id} key={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="ssn1"
                    label="Gender"
                    placeholder="male or female"
                    name="ssn1"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="ssn"
                    label="Stock"
                    name="ssn"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Color"
                    name="color"
                    onChange={(e) => setColor(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Price"
                    id="password"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Description"
                    id="password2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="sizeOptions"
                    placeholder="Enter comma(,) sepearated values"
                    id="password2"
                    value={sizeoptions}
                    onChange={(e) => setSizeoptions(e.target.value)}
                  />
                </Grid>

                <Grid item xs={8}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Image"
                    id="password33"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  {loadingUpload && (
                    <Typography variant="subtitle2">Loading...</Typography>
                  )}
                  <Button
                    size="small"
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{ bgcolor: "primary.light", mt: 2 }}
                  >
                    Upload file
                    <VisuallyHiddenInput
                      type="file"
                      onChange={uploadFileHandler}
                      required
                    />
                  </Button>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "primary.light" }}
              >
                Add Shoe
              </Button>
              {isLoading && (
                <Typography variant="subtitle2">Loading...</Typography>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
