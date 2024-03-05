import supabase from './supabase';
import { ICartItems } from '../features/cart/cartSlice';

export async function getCart(userId: string | undefined) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addCart(cartItems: ICartItems) {
  const { error } = await supabase.from('cart').insert(cartItems);

  if (error) throw new Error(error.message);
}

type UpdateCart = {
  selectedSize?: number;
  quantity?: number;
  total?: number;
};

export async function updateCart(
  updatedItem: UpdateCart,
  cartId: string | undefined
) {
  const { data, error } = await supabase
    .from('cart')
    .update(updatedItem)
    .eq('cart_id', cartId)
    .select();

  if (error) throw new Error(error.message);

  console.log('hello', data, cartId);

  return data;
}

export async function deleteCart(cartId: string | undefined) {
  const { error } = await supabase.from('cart').delete().eq('cart_id', cartId);

  if (error) throw new Error(error.message);
}
