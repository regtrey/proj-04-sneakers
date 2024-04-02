import supabase from './spb/dir/supabase';
import { ICart } from '../types/ProductType';

export async function getFavourites(userId: string | undefined) {
  if (userId === undefined) return null;

  const { data, error } = await supabase
    .from('favourites')
    .select('*')
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getFavourite(
  userId: string | undefined,
  shoeId: string | undefined
) {
  if (userId === undefined || shoeId === undefined) return null;

  const { data, error } = await supabase
    .from('favourites')
    .select('*')
    .match({ user_id: userId, shoe_id: shoeId });

  if (error) throw new Error(error.message);

  return data;
}

export async function addFavourite(favItem: ICart) {
  const { error } = await supabase.from('favourites').insert(favItem);

  if (error) throw new Error(error.message);
}

export async function deleteFavourite(
  userId: string | undefined,
  shoeId: string | undefined
) {
  const { error } = await supabase
    .from('favourites')
    .delete()
    .match({ user_id: userId, shoe_id: shoeId });

  if (error) throw new Error(error.message);
}
