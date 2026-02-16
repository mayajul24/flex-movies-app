import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const Header = styled.header`
  flex-shrink: 0;
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;