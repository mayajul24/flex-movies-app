import styled from 'styled-components';

export const SearchContainer = styled.div<{ $isActive: boolean }>`
  padding: 8px 24px;
`;

export const SearchInput = styled.input<{ $isActive: boolean }>`
  width: 100%;
  padding: 10px 16px;
  border: 2px solid ${({ $isActive }) => ($isActive ? '#e50914' : '#3a3a3a')};
  border-radius: 8px;
  background: #1e1e1e;
  color: #ffffff;
  font-size: 14px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: #888;
  }
`;