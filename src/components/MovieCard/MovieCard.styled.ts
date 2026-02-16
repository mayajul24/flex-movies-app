import styled from 'styled-components';

export const CardContainer = styled.div<{ $isFocused: boolean }>`
  border: 2px solid ${({ $isFocused }) => ($isFocused ? '#e50914' : 'transparent')};
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e1e;
  transform: ${({ $isFocused }) => ($isFocused ? 'scale(1.05)' : 'scale(1)')};
  transition: transform 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

export const PosterImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: fill;
  display: block;
  background: #2a2a2a;
`;

export const CardInfo = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const Rating = styled.span`
  font-size: 13px;
  color: #ffd700;
  flex-shrink: 0;
`;