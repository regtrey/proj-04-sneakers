import supabase from './supabase';

export async function getShoes(currentPath: string) {
  let data, error;

  if (currentPath === 'new-and-featured') {
    // Sort all by uuid
    ({ data, error } = await supabase.from('shoes').select('*').order('uuid'));
  }

  if (currentPath === 'mens' || currentPath === 'womens') {
    ({ data, error } = await supabase
      .from('shoes')
      .select('*')
      .eq('categorySlug', currentPath));
  }

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
