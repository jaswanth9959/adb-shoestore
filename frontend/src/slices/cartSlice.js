import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartutil";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const item = action.payload;
      state.cartItems = [...state.cartItems, item];
      // const existItem = state.cartItems.find((x) => item._id === x._id);

      // if (existItem) {
      //   state.cartItems = state.cartItems.map((x) =>
      //     x._id === existItem._id ? item : x
      //   );
      // } else {
      //   state.cartItems = [...state.cartItems, item];
      // }

      return updateCart(state);
    },

    removefromcart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return updateCart(state);
    },

    clearcart: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const { addTocart, removefromcart, clearcart, saveShippingAddress } =
  cartSlice.actions;
export default cartSlice.reducer;
