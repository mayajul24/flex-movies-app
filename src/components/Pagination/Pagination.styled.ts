import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  flex-shrink: 0;
`;

export const PageButton = styled.button<{ $isFocused: boolean; $disabled?: boolean }>`
  padding: 6px 16px;
  border: 2px solid ${({ $isFocused }) => ($isFocused ? '#e50914' : 'transparent')};
  border-radius: 6px;
  background: #2a2a2a;
  color: ${({ $disabled }) => ($disabled ? '#555' : '#ffffff')};
  font-size: 14px;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  transition: border-color 0.2s ease;
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  &:hover {
    background: ${({ $disabled }) => ($disabled ? '#2a2a2a' : '#3a3a3a')};
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: #aaa;
`;