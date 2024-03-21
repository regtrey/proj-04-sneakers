import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUser } from '../features/auth/useUser';
import Spinner from './Spinner';

const FullPage = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AuthProtect({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { isAuthenticated, userLoading } = useUser();

  useEffect(() => {
    if (isAuthenticated && !userLoading) navigate('/');
  }, [isAuthenticated, userLoading, navigate]);

  if (userLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!isAuthenticated) return children;
}

export default AuthProtect;
