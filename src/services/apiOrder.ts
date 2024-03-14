import supabase from './supabase';
import { IOrder } from '../types/ProductType';

export async function addOrder(orderItem: IOrder) {
  const { error } = await supabase.from('orders').insert(orderItem);

  if (error) throw new Error(error.message);
}

export async function deleteCartOrder(userId: string | undefined) {
  const { error } = await supabase.from('cart').delete().eq('user_id', userId);

  if (error) throw new Error(error.message);
}
