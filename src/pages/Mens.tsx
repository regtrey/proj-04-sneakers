import styled from 'styled-components';
import MensProducts from '../features/categories/mens/MensProducts';

const StyledMens = styled.div`
  height: 100%;
  /* background-color: red; */
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
        <MensProducts />
      </Layout>
    </StyledMens>
  );
}

export default Mens;
