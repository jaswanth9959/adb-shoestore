import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteIcon from "@mui/icons-material/Delete";
import { removefromcart } from "../slices/cartSlice";
function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteHandler = (id) => {
    dispatch(removefromcart(id));
    toast.error("shoe is removed!");
  };

  const checkoutHandler = () => {
    navigate("/delivery");
  };
  return (
    <Box
      sx={{
        width: "80%",
        minHeight: "72vh",
        margin: "0 auto",
        padding: 2,
        position: "relative",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length ? (
        <>
          <List>
            {cartItems.map((product) => (
              <ListItem
                key={product.id}
                alignItems="flex-start"
                sx={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: 2,
                  marginBottom: 2,
                  alignItems: "center",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    sx={{ width: 100, height: 100, marginRight: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={"span"} variant={"h6"}>
                      {product.name}
                    </Typography>
                  }
                  secondary={
                    <Stack direction="row" spacing={6}>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Brand: {product.brand}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Size: {product.size}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Quantity: {product.qty}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Color: {product.color?.toUpperCase()}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Price: ${product.price}
                      </Typography>
                    </Stack>
                  }
                />
                <IconButton onClick={() => deleteHandler(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            endIcon={<ShoppingCartCheckoutIcon />}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 16,
              bgcolor: "primary.light",
            }}
            onClick={checkoutHandler}
          >
            CheckOut
          </Button>
        </>
      ) : (
        <Typography variant="h6">
          Your Cart is Empty. <Link to="/">View Shoes</Link>
        </Typography>
      )}
    </Box>
  );
}

export default CartScreen;
