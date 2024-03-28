import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledSearch = styled.input`
  height: 4rem;
  width: 20rem;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  background-color: var(--color-gray-100);
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.5rem 1.25rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery || searchQuery.length <= 1) return;

    navigate(`/results?query=${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSearch}>
      <StyledSearch
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}

export default Search;
