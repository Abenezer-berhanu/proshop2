import { createSlice } from "@reduxjs/toolkit";

const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed()
}

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //calculate items price
      state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
      //calculate shipping price (if order is over 100$ then free, else $30 shipping)
      state.deliveryPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10)
      //calculate tax price
      state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)))

      //calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.deliveryPrice) +
        Number(state.taxPrice)
      ).toFixed(2)
      localStorage.setItem('cart', state)
    },
  },
});

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer;
