export interface IProduct {
  shoe_id: string;
  name: string;
  brand: string;
  category: string;
  sizes: string[];
  colors: string[];
  tag: string;
  price: number;
  image: string[];
  alt: string;
  placeholder: string[];
  slug: string;
  categorySlug: string;
}

export interface ICart {
  cart_id?: string;
  shoe_id?: string;
  name: string;
  brand?: string;
  category: string;
  tag?: string;
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
  isFavourite: boolean;
  total?: number;
  user_id?: string;
}

export interface IOrder {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
  order: ICart[];
  user_id: string;
}
