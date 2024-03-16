import styled from 'styled-components';
import { Button } from '../ui/Button';

const StyledAccount = styled.div`
  height: 100dvh;
  background-color: var(--color-gray-100);
  padding: 6rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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

const AccountSettings = styled.div`
  width: 70vw;
  width: 100%;
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--border-radius-md);
  /* margin: 0 auto; */
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const InputContainer = styled.div`
  width: 85%;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 1.5rem 0;
  padding-right: 40rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 1.6rem;
`;

const Input = styled.input`
  height: 4.5rem;
  width: 40rem;
  font-size: 1.6rem;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  padding: 1.5rem;
`;

const ButtonContainer = styled.div`
  width: 85%;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
`;

function Account() {
  return (
    <StyledAccount>
      <Heading>Account</Heading>
      <SubHeading>Update user profile</SubHeading>

      <AccountSettings>
        <InputContainer>
          <Label>Email</Label>
          <Input placeholder="Email" />
        </InputContainer>
        <InputContainer>
          <Label>Full name</Label>
          <Input placeholder="Full name" />
        </InputContainer>
        <InputContainer>
          <Label>Password</Label>
          <Input type="password" placeholder="Password" />
        </InputContainer>

        <ButtonContainer>
          <Button
            type="reset"
            $variant="secondary"
            $size="md"
            $custom="padding: 2rem;"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            $variant="primary"
            $size="md"
            $custom="padding: 2rem;"
          >
            Update account
          </Button>
        </ButtonContainer>
      </AccountSettings>
    </StyledAccount>
  );
}

export default Account;
