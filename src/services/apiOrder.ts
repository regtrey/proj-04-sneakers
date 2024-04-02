import supabase from './spb/dir/supabase';
import { IOrder } from '../types/ProductType';

export async function getOrder(userId: string | undefined) {
  if (userId === undefined) return;

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addOrder(orderItem: IOrder) {
  const { error } = await supabase.from('orders').insert(orderItem);

  if (error) throw new Error(error.message);
}

export async function deleteCartOrder(userId: string | undefined) {
  if (userId === undefined) return;

  const { error } = await supabase.from('cart').delete().eq('user_id', userId);

  if (error) throw new Error(error.message);
}
