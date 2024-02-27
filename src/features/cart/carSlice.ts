import { createSlice } from '@reduxjs/toolkit';

interface ICartItems {
  id: number;
  name: string;
  category: string;
  color: string;
  size: string;
  image: string;
  alt: string;
  price: number;
  quantity: number;
}

interface ICartState {
  cartItems: ICartItems[];
}

const initialState: ICartState = {
  cartItems: [
    {
      id: 1,
      name: 'Nike SB Force 58',
      category: 'Skate Shoes',
      color: 'Phantom/Summit White/Sail/University Blue',
      size: 'US 9.5',
      image: 'image.jpeg',
      alt: 'Nike SB Force 58',
      price: 92,
      quantity: 1,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    deleteCartItem: (state, action) => {
      state.cartItems.filter((item) => item !== action.payload);
    },
    updateItemQuantity: (state, action) => {
      // ex. payload: {id: 1, quantity: 2}
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIndex].quantity = action.payload.quantity;
      state.cartItems[itemIndex].price *= action.payload.quantity;
    },
  },
});

export const { addCartItem, deleteCartItem, updateItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
