import supabase from './supabase';

export async function getShoes() {
  const { data, error } = await supabase.from('shoes').select('*');

  if (error) {
    console.error(error);
    throw new Error('Shoes could not be loaded');
  }

  return data;
}

export async function getShoe(slugId: string) {
  const { data, error } = await supabase
    .from('shoes')
    .select('*')
    .eq('slug', slugId);

  if (error) {
    console.error(error);
    throw new Error('Shoe could not be loaded');
  }

  return data;
}
