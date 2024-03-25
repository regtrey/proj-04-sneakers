import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { IProduct } from '../types/ProductType';

const StyledProduct = styled.div`
  height: max-content;
  margin-bottom: 2rem;
  position: relative;

  @media screen and (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const ProductImage = styled(LazyLoadImage)`
  height: 36rem;
  width: 100%;
  object-fit: contain;
  display: block;

  @media screen and (max-width: 768px) {
    height: 15rem;
  }
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
  const { name, category, colors, tag, price, image, alt, placeholder } =
    product;

  return (
    <StyledProduct>
      <ProductImage
        src={image[0]}
        alt={alt}
        placeholderSrc={placeholder[0]}
        effect="blur"
      />
      <ProductDetails>
        <Tag>{tag}</Tag>
        <Name>{name}</Name>
        <ShoeCategory>
          {category}
          {category === 'kids' || category === 'sports' ? "'" : "'s"} Shoes{' '}
          <br />
          {colors.length} {colors.length > 1 ? 'Colours' : 'Colour'}
        </ShoeCategory>
        <Price>${price}</Price>
      </ProductDetails>
    </StyledProduct>
  );
}

export default Product;
