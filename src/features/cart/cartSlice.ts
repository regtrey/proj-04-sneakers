import { createSlice } from '@reduxjs/toolkit';

export interface ICartItems {
  id: number;
  name: string;
  category: string;
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
  total: number;
}

interface ICartState {
  cartItems: ICartItems[];
  favouriteItems: ICartItems[];
}

const initialState: ICartState = {
  cartItems: [
    {
      id: 1,
      name: 'Air Jordan 1 Low SE',
      category: 'men',
      slug: 'air-jordan-1-low-se',
      categorySlug: 'mens',
      color: 'White/Black/Sail/Blue Grey',
      sizes: [
        'US 7',
        'US 7.5',
        'US 8',
        'US 8.5',
        'US 9',
        'US 9.5',
        'US 10',
        'US 10.5',
        'US 11',
        'US 11.5',
        'US 12',
        'US 12.5',
        'US 13',
      ],
      selectedSize: 9.5,
      image:
        'https://sqvelnvvyapcyvkpuimq.supabase.co/storage/v1/object/public/shoe-images/air-jordan-1-low-se-01.png',
      alt: 'Air Jordan 1 Low SE',
      placeholder:
        'https://sqvelnvvyapcyvkpuimq.supabase.co/storage/v1/object/public/shoe-images/air-jordan-1-low-se-placeholder-01.jpg',
      price: 145,
      quantity: 1,
      total: 145,
    },
  ],
  favouriteItems: [
    {
      id: 1,
      name: 'Air Jordan 1 Low SE',
      category: 'men',
      slug: 'air-jordan-1-low-se',
      categorySlug: 'mens',
      color: 'White/Black/Sail/Blue Grey',
      sizes: [
        'US 7',
        'US 7.5',
        'US 8',
        'US 8.5',
        'US 9',
        'US 9.5',
        'US 10',
        'US 10.5',
        'US 11',
        'US 11.5',
        'US 12',
        'US 12.5',
        'US 13',
      ],
      selectedSize: 9.5,
      image:
        'https://sqvelnvvyapcyvkpuimq.supabase.co/storage/v1/object/public/shoe-images/air-jordan-1-low-se-01.png',
      alt: 'Air Jordan 1 Low SE',
      placeholder:
        'https://sqvelnvvyapcyvkpuimq.supabase.co/storage/v1/object/public/shoe-images/air-jordan-1-low-se-placeholder-01.jpg',
      price: 145,
      quantity: 1,
      total: 145,
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
      // ex. payload: {id: 1}
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateItemQuantity: (state, action) => {
      // ex. payload: {id: 1, quantity: 2}
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
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
        (item) => item.id !== action.payload.id
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
