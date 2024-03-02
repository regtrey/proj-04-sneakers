import supabase from './supabase';

export async function getShoes(currentPath: string) {
  let data, error;

  if (currentPath === 'new-and-featured') {
    ({ data, error } = await supabase.from('shoes').select('*'));
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
