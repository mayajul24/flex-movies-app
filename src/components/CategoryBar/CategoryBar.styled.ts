import styled from 'styled-components';

export const CategoryBarContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 16px 24px 8px;
`;

export const CategoryTab = styled.button<{ $isActive: boolean; $isFocused: boolean }>`
  padding: 8px 20px;
  border: 2px solid ${({ $isFocused }) => ($isFocused ? '#e50914' : 'transparent')};
  border-radius: 20px;
  background: ${({ $isActive }) => ($isActive ? '#e50914' : '#2a2a2a')};
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? '#f40612' : '#3a3a3a')};
  }
`;