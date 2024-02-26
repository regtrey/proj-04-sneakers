import styled from 'styled-components';
import { IProduct } from '../types/ProductType';

const StyledProduct = styled.div`
  height: max-content;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  display: block;
`;

const ProductDetails = styled.div`
  font-size: 1.65rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
`;

const Tag = styled.span`
  font-weight: 500;
  color: #b83737;
  text-transform: capitalize;
`;

const Name = styled.span`
  font-weight: 600;
`;

const ShoeCategory = styled.span`
  color: var(--color-gray-500);
  text-transform: capitalize;
`;

const Price = styled.span`
  font-weight: 600;
  margin-top: 0.75rem;
`;

interface IProductProps {
  product: IProduct;
}

function Product({ product }: IProductProps) {
  const { name, category, colors, tag, price, image, alt } = product;

  return (
    <StyledProduct>
      <ProductImage src={image[0]} alt={alt} />
      <ProductDetails>
        <Tag>{tag}</Tag>
        <Name>{name}</Name>
        <ShoeCategory>
          {category}'s Shoes <br />
          {colors.length} Colour
        </ShoeCategory>
        <Price>${price}</Price>
      </ProductDetails>
    </StyledProduct>
  );
}

export default Product;
