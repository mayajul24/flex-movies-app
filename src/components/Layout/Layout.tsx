import React from 'react';
import { LayoutContainer, Header, Content } from './Layout.styled';
import { CategoryBar } from '../CategoryBar/CategoryBar';
import { SearchBar } from '../SearchBar/SearchBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <LayoutContainer>
    <Header>
      <CategoryBar />
      <SearchBar />
    </Header>
    <Content>{children}</Content>
  </LayoutContainer>
);