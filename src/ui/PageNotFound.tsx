import styled from 'styled-components';
import { useNavigate } from 'react-router';

import { Button } from './Button';

const StyledPageNotFound = styled.div`
  height: 100dvh;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    gap: 1.5rem;
    align-items: center;
  }
`;

const ErrorMessage = styled.h1`
  font-size: 6rem;
  font-weight: 500;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 3rem;
    text-align: center;
  }
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StyledPageNotFound>
      <ErrorContainer>
        <ErrorMessage>
          Whoops! <br />
          Page not found
        </ErrorMessage>
        <Button $variant="primary" $size="md" onClick={() => navigate('/')}>
          Go back
        </Button>
      </ErrorContainer>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
