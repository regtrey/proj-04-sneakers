import styled, { css } from 'styled-components';

const type = {
  primary: css`
    background-color: #000;
    border: none;
    color: var(--color-gray-0);

    &:hover {
      background-color: var(--color-gray-700);
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
  lg: css`
    height: 6rem;
    font-size: 1.75rem;
    border-radius: 100px;
  `,
};

interface IButton {
  type: 'primary' | 'secondary';
  $size: 'lg';
}

export const Button = styled.button<IButton>`
  border: none;
  background-color: var(--color-gray-0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) => type[props.type]}
  ${(props) => size[props.$size]}
`;
