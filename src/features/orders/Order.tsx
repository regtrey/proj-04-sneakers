import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { ICart } from '../../types/ProductType';
import formatCurrency from '../../utils/formatCurrency';

const StyledOrder = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  gap: 5rem;

  @media screen and (max-width: 768px) {
    gap: 2.5rem;
  }
`;

const ItemImage = styled(LazyLoadImage)`
  height: 15rem;
  width: 15rem;
  display: block;
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ItemName = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ItemDetails = styled.span`
  font-size: 1.6rem;
  color: var(--color-gray-500);
`;

function Order({ item }: { item: ICart }) {
  return (
    <StyledOrder>
      <ItemImage
        src={item.image}
        alt={item.name}
        placeholderSrc={item.placeholder}
        effect="blur"
      />
      <ItemDescription>
        <ItemName>{item.name}</ItemName>
        <ItemDetails>Size: {item.selectedSize}</ItemDetails>
        <ItemDetails>Color: {item.color}</ItemDetails>
        <ItemDetails>
          Qty: {item.quantity} @ {item.total && formatCurrency(item.total)}
        </ItemDetails>
        <ItemDetails>{item.total && formatCurrency(item.total)}</ItemDetails>
      </ItemDescription>
    </StyledOrder>
  );
}

export default Order;
