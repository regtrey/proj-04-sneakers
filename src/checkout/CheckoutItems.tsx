import styled from 'styled-components';

import { ICart } from '../types/ProductType';
import formatCurrency from '../utils/formatCurrency';

const StyledCheckoutItems = styled.div`
  /* background-color: red; */
  /* padding: 2rem;  */
  margin: 2rem 0;
  display: flex;
  gap: 1rem;
`;

const ItemImage = styled.img`
  height: 7rem;
  width: 7rem;
  display: block;
`;

const ItemDescription = styled.div`
  width: 100%;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ItemName = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ItemDetails = styled.span`
  font-size: 1.3rem;
  color: var(--color-gray-500);
`;

interface ICheckoutItemsProps {
  item: ICart;
}

// cart_id?: string;
//   shoe_id?: string;
//   name: string;
//   brand?: string;
//   category: string;
//   tag?: string;
//   slug: string;
//   categorySlug: string;
//   color: string;
//   sizes: string[];
//   selectedSize: number;
//   image: string;
//   alt: string;
//   placeholder: string;
//   price: number;
//   quantity: number;
//   isFavourite: boolean;
//   total?: number;
//   user_id?: string;

function CheckoutItems({ item }: ICheckoutItemsProps) {
  return (
    <StyledCheckoutItems>
      <ItemImage src={item.image} alt={item.name} />
      <ItemDescription>
        <ItemName>{item.name}</ItemName>
        <ItemDetails>Size: {item.selectedSize}</ItemDetails>
        <ItemDetails>Color: {item.color}</ItemDetails>
        <ItemDetails>
          Qty: {item.quantity} @ {item.total && formatCurrency(item.total)}
        </ItemDetails>
        <ItemDetails>{item.total && formatCurrency(item.total)}</ItemDetails>
      </ItemDescription>
    </StyledCheckoutItems>
  );
}

export default CheckoutItems;
