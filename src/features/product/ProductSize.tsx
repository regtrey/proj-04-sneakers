import styled, { css } from 'styled-components';
import { useProductDetails } from './useProductDetails';

const SizeHeading = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

const sizeError = {
  none: css`
    outline: 1px solid transparent;
  `,
  error: css`
    outline: 1px solid #ff0000;
  `,
};

interface IError {
  $sizeSelect?: 'none' | 'error';
}

const StyledProductSize = styled.div<IError>`
  height: max-content;
  width: 38rem;
  border-radius: var(--border-radius-sm);
  outline-offset: 1px;
  margin: 1rem 0 4rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;

  ${(props) =>
    props.$sizeSelect === 'none' ? sizeError['none'] : sizeError['error']}

  @media screen and (min-width: 801px) and (max-width: 850px) {
    width: 90vw;
    gap: 3.3rem;
  }

  @media screen and (min-width: 768px) and (max-width: 800px) {
    width: 90vw;
    gap: 2.75rem;
  }

  @media screen and (max-width: 767px) {
    width: 90vw;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
`;

interface ISizeProps {
  $isSelected: boolean;
}

const Size = styled.div<ISizeProps>`
  height: 5rem;
  width: 12rem;
  font-size: 1.5rem;
  border: ${(props) =>
    props.$isSelected ? '1px solid #000' : '1px solid var(--color-gray-100)'};
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover {
    border: 1px solid #000;
  }

  & input {
    height: 100%;
    width: 100%;
    opacity: 0;
    position: absolute;
    cursor: pointer;
    z-index: 2;
  }

  @media screen and (max-width: 768px) {
    width: 11rem;
  }

  @media screen and (max-width: 410px) {
    width: 10rem;
  }
`;

const SelectSizeSpan = styled.span<IError>`
  font-size: 1.5rem;
  color: red;
  position: absolute;
  bottom: -3rem;

  display: ${(props) => (props.$sizeSelect === 'none' ? 'none' : 'block')};
`;

interface ProductSizeProps {
  hasSelectedSize: boolean;
  setHasSelectedSize: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProductSize({
  hasSelectedSize,
  setHasSelectedSize,
}: ProductSizeProps) {
  const { shoe, currentSelectedSize, handleSelect } = useProductDetails();

  if (!shoe) return;

  const { sizes } = shoe;

  return (
    <>
      <SizeHeading>Select Size</SizeHeading>
      <StyledProductSize $sizeSelect={hasSelectedSize ? 'none' : 'error'}>
        {sizes.map((size, index) => {
          const curSize = size.split(' ')[1];
          return (
            <Size
              key={index}
              $isSelected={currentSelectedSize === Number(curSize)}
            >
              <input
                id={curSize}
                type="radio"
                value={curSize}
                onClick={(e) => {
                  setHasSelectedSize(true);
                  handleSelect(e, 'size');
                }}
              />
              {size}
            </Size>
          );
        })}
        <SelectSizeSpan $sizeSelect={hasSelectedSize ? 'none' : 'error'}>
          Please select a size.
        </SelectSizeSpan>
      </StyledProductSize>
    </>
  );
}

export default ProductSize;
