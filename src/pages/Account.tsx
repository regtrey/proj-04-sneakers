import styled from 'styled-components';
import AccountSettings from '../features/account/AccountSettings';

const StyledAccount = styled.div`
  height: 100dvh;
  background-color: var(--color-gray-100);
  padding: 6rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 500;
`;

const SubHeading = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

function Account() {
  return (
    <StyledAccount>
      <Heading>Account</Heading>
      <SubHeading>Update user profile</SubHeading>
      <AccountSettings />
    </StyledAccount>
  );
}

export default Account;
