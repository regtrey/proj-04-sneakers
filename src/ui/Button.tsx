import styled, { css } from 'styled-components';

const variant = {
  primary: css`
    background-color: #000;
    border: none;
    color: var(--color-gray-0);

    &:hover {
      background-color: #404040;
    }
  `,
  secondary: css`
    background-color: var(--color-gray-0);
    border: 1.5px solid var(--color-gray-200);

    &:hover {
      border: 1.5px solid #000;
    }
  `,
};

const size = {
  md: css`
    height: 5rem;
    font-size: 1.5rem;
    border-radius: 100px;
  `,
  lg: css`
    height: 6rem;
    font-size: 1.75rem;
    border-radius: 100px;
  `,
};

interface IButton {
  $variant: 'primary' | 'secondary';
  $size: 'md' | 'lg';
  $custom?: string;
}

export const Button = styled.button<IButton>`
  border: none;
  background-color: var(--color-gray-0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:disabled {
    background-color: #404040;
  }

  ${(props) => variant[props.$variant]}
  ${(props) => size[props.$size]}
  ${(props) => props.$custom}
`;
