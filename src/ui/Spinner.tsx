import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

interface ISpinner {
  $custom?: string;
}

const Spinner = styled.div<ISpinner>`
  margin: 6rem auto;
  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, #000 94%, #0000) top/10px 10px
      no-repeat,
    conic-gradient(#0000 30%, #000);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;

  ${(props) => (props.$custom ? props.$custom : '')}
`;

export default Spinner;
