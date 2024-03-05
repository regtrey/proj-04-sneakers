import { createSlice } from '@reduxjs/toolkit';

export interface ICartItems {
  cart_id?: string;
  shoe_id?: string;
  name: string;
  brand?: string;
  category: string;
  tag?: string;
  slug: string;
  categorySlug: string;
  color: string;
  sizes: string[];
  selectedSize: number;
  image: string;
  alt: string;
  placeholder: string;
  price: number;
  quantity: number;
  isFavourite: boolean;
  total?: number;
  user_id?: string;
}

interface ICartState {
  cartItems: ICartItems[];
  favouriteItems: ICartItems[];
}

const initialState: ICartState = {
  cartItems: [],
  favouriteItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.cartItems.push(action.payload);
    },
    deleteCartItem: (state, action) => {
      // ex. payload: {id: 1}
      state.cartItems = state.cartItems.filter(
        (item) => item.shoe_id !== action.payload.id
      );
    },
    updateItemQuantity: (state, action) => {
      // ex. payload: {id: 1, quantity: 2}
      const itemIndex = state.cartItems.findIndex(
        (item) => item.shoe_id === action.payload.id
      );
      state.cartItems[itemIndex].quantity = action.payload.quantity;
      state.cartItems[itemIndex].total =
        state.cartItems[itemIndex].price * action.payload.quantity;
    },
    addFavouriteItem: (state, action) => {
      state.favouriteItems.push(action.payload);
    },
    deleteFavouriteItem: (state, action) => {
      // ex. payload: {id: 1}
      state.favouriteItems = state.favouriteItems.filter(
        (item) => item.shoe_id !== action.payload.id
      );
    },
  },
});

export const {
  addCartItem,
  deleteCartItem,
  updateItemQuantity,
  addFavouriteItem,
  deleteFavouriteItem,
} = cartSlice.actions;

export default cartSlice.reducer;
