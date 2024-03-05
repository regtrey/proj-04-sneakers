import supabase from './supabase';
import { ICart } from '../types/ProductType';

export async function getCart(userId: string | undefined) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addCart(cartItems: ICart) {
  const { error } = await supabase.from('cart').insert(cartItems);

  if (error) throw new Error(error.message);
}

type UpdateCart = {
  selectedSize?: number;
  quantity?: number;
  total?: number;
  isFavourite?: boolean;
};

export async function updateCart(
  updatedItem: UpdateCart,
  cartId: string | undefined,
  eqField?: string | undefined
) {
  const { data, error } = await supabase
    .from('cart')
    .update(updatedItem)
    .eq(!eqField ? 'cart_id' : eqField, cartId)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteCart(cartId: string | undefined) {
  const { error } = await supabase.from('cart').delete().eq('cart_id', cartId);

  if (error) throw new Error(error.message);
}
