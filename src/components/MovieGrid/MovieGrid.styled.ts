import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  gap: 16px;
  padding: 16px 24px;
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;