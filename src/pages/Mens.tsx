import styled from 'styled-components';
import Products from '../ui/Products';

const StyledMens = styled.div`
  padding: 6rem 4rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

const Layout = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 20rem 1fr;
  gap: 4rem;
`;

const Refinements = styled.aside`
  background-color: green;

  grid-column: 1 / 2;
`;

function Mens() {
  return (
    <StyledMens>
      <Heading>Men's shoes</Heading>

      <Layout>
        <Refinements>REFINEMENTS</Refinements>
        <Products />
      </Layout>
    </StyledMens>
  );
}

export default Mens;
