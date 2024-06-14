import React, { useState } from "react";
import { addTocart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetShoeByIdQuery,
  useCreateReviewMutation,
} from "../slices/shoesApiSlice";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CardMedia from "@mui/material/CardMedia";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReviewList from "../components/ReviewList";
import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
function ShoeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id: shoeId } = useParams();
  const {
    data: shoe,
    isLoading,
    isError,
    refetch,
  } = useGetShoeByIdQuery(shoeId);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState(false);

  const handleChange = (e) => {
    setSize(e.target.value);
  };
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const addtocartHandler = () => {
    if (size === "") {
      setErr(true);
      return;
    } else {
      dispatch(
        addTocart({
          id: shoe._id,
          name: shoe.name,
          brand: shoe.brand,
          price: shoe.price,
          image: shoe.image,
          category: shoe.category.name,
          color: shoe.color,
          size,
          qty,
        })
      );
      navigate("/cart");
    }
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview] = useCreateReviewMutation();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        shoeId,
        rating,
        comment,
        name: userInfo.user.firstname,
        userId: userInfo.user._id,
      }).unwrap();
      refetch();
      setComment("");
      setRating(0);
      toast.success("Review created successfully");
    } catch (err) {
      setComment("");
      setRating(0);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ my: 2, bgcolor: "primary.light" }}
      >
        Back
      </Button>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography>Error...</Typography>
      ) : (
        <Grid container spacing={8}>
          <Grid item sm={5} sx={{ mr: 6 }}>
            <Card>
              <CardMedia
                component="img"
                height="450"
                image={`http://localhost:5000${shoe.image}`}
                alt={shoe.name}
              />
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card>
              <CardHeader
                title={shoe.name}
                subheader={`By ${shoe.brand}`}
                sx={{ py: 3 }}
              />
              <Rating
                name="read-only"
                value={shoe.rating}
                readOnly
                size="large"
                sx={{ marginRight: "auto", ml: 2 }}
              />
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  <strong>Description : </strong>
                  {shoe.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  <strong>Gender : </strong>
                  {shoe.gender.toUpperCase()}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  <strong>Color : </strong>
                  {shoe.color.toUpperCase()}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  <strong>Category : </strong>
                  {shoe.category.name.toUpperCase()}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  <strong>Price : </strong>${shoe.price}
                </Typography>
                <FormControl sx={{ minWidth: 120, mr: "20px" }} error={err}>
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    label="size"
                    onChange={handleChange}
                  >
                    {shoe.sizeOptions.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                  {err && <FormHelperText>Select Size</FormHelperText>}
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select">Qty</InputLabel>
                  <Select
                    labelId="demo-simple-select"
                    id="demo-simple-select"
                    value={qty}
                    label="qty"
                    onChange={handleQty}
                  >
                    <MenuItem key={1} value={1}>
                      {1}
                    </MenuItem>
                    <MenuItem key={2} value={2}>
                      {2}
                    </MenuItem>
                    <MenuItem key={3} value={3}>
                      {3}
                    </MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  variant="contained"
                  endIcon={<ShoppingCartIcon />}
                  color="info"
                  sx={{ width: "125px", ml: 1 }}
                  onClick={addtocartHandler}
                >
                  Add
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          mt: 4,
          py: 3,
          border: "1px solid #8f8f8f",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "60%" },
          "& .MuiButton-root": { m: 1, width: "60%" },
        }}
      >
        {shoe?.reviews?.length > 0 && <ReviewList reviews={shoe?.reviews} />}

        <>
          <Typography variant="h6" gutterBottom>
            Leave a Review
          </Typography>
          <TextField
            select
            label="Rating"
            value={rating}
            onChange={handleRatingChange}
            variant="outlined"
            required
          >
            {[1, 2, 3, 4, 5].map((option) => (
              <MenuItem key={option} value={option}>
                {option} Star{option > 1 && "s"}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Comment"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            variant="outlined"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </>
      </Box>
    </Box>
  );
}

export default ShoeScreen;
