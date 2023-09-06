export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed();
  };

export const updateCartItem = (state) => {
    //calculate items price
    state.itemsPrice = addDecimal(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      //calculate shipping price (if order is over 100$ then free, else $30 shipping)
      state.deliveryPrice = addDecimal(state.itemsPrice > 100 ? 0 : 10);
      //calculate tax price
      state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));

      //calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.deliveryPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      localStorage.setItem("cart", JSON.stringify(state));

      return state;
}