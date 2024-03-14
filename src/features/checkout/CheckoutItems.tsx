import styled from 'styled-components';

import { ICart } from '../../types/ProductType';
import formatCurrency from '../../utils/formatCurrency';

const StyledCheckoutItems = styled.div`
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
