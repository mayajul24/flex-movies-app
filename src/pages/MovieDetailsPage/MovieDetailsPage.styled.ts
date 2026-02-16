import styled from 'styled-components';

export const DetailsContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

export const Backdrop = styled.div<{ $src: string | null }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${({ $src }) => ($src ? `url(${$src})` : 'none')};
  background-size: cover;
  background-position: center;
  opacity: 0.2;
`;

export const DetailsContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: 32px;
  padding: 32px;
  height: 100%;
  overflow: hidden;
`;

export const PosterWrapper = styled.div`
  flex-shrink: 0;
`;

export const Poster = styled.img`
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  flex: 1;
`;

export const MovieTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
`;

export const Tagline = styled.p`
  font-size: 16px;
  color: #aaa;
  font-style: italic;
`;

export const Overview = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #ddd;
`;

export const MetaRow = styled.div`
  display: flex;
  gap: 24px;
  font-size: 14px;
  color: #aaa;
`;

export const GenreList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const GenreTag = styled.span`
  padding: 4px 12px;
  background: #2a2a2a;
  border-radius: 16px;
  font-size: 13px;
  color: #ccc;
`;

export const ActionButton = styled.button<{ $isFocused: boolean; $variant?: 'primary' | 'default' }>`
  padding: 10px 24px;
  border: 2px solid ${({ $isFocused }) => ($isFocused ? '#e50914' : 'transparent')};
  border-radius: 8px;
  background: ${({ $variant }) => ($variant === 'primary' ? '#e50914' : '#2a2a2a')};
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
  align-self: flex-start;

  &:hover {
    background: ${({ $variant }) => ($variant === 'primary' ? '#f40612' : '#3a3a3a')};
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;