import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { useProductDetails } from './useProductDetails';

import Spinner from '../../ui/Spinner';
import ProductSpecs from './ProductSpecs';

const ProductImageContainer = styled.div`
  width: 55rem;
  height: 55rem;
  position: relative;

  @media screen and (max-width: 767px) {
    width: 90vw;
    height: 35rem;
  }
`;

const ProductImage = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-md);
  display: block;
`;

function Details() {
  const { shoe, isLoading, error, currentSelectedStyle } = useProductDetails();

  if (isLoading) return <Spinner />;
  if (!shoe || error) return 'Error...';

  const { image, alt, placeholder } = shoe;

  return (
    <>
      <ProductImageContainer>
        <ProductImage
          src={image[currentSelectedStyle - 1]}
          alt={alt}
          placeholderSrc={placeholder[currentSelectedStyle - 1]}
          effect="blur"
        />
      </ProductImageContainer>
      <ProductSpecs />
    </>
  );
}

export default Details;
