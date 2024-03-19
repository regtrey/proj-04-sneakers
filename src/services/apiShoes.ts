import supabase from './supabase';

export async function getShoes(currentPath: string, searchQuery?: string) {
  let data, error;

  if (currentPath === 'new-and-featured') {
    // Sort all by uuid
    ({ data, error } = await supabase
      .from('shoes')
      .select('*')
      .order('brand')
      .order('shoe_id'));
  }

  if (currentPath === 'results' && searchQuery) {
    // If the query contains a space, it needs to be separated by an operator
    const query = searchQuery.split(' ');

    ({ data, error } = await supabase
      .from('shoes')
      .select('*')
      .textSearch('name', `${query.join(' & ')}`));
  }

  if (
    currentPath === 'mens' ||
    currentPath === 'womens' ||
    currentPath === 'kids' ||
    currentPath === 'sports'
  ) {
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

export async function getShoe(currentPath: string, curSlugId: string) {
  // Fetching the product from its category to avoid fetching the same product from different category
  const { data, error } = await supabase
    .from('shoes')
    .select('*')
    .match({ categorySlug: currentPath, slug: curSlugId })
    .single();

  if (error) {
    console.error(error);
    throw new Error('Shoe could not be loaded');
  }

  return data;
}
