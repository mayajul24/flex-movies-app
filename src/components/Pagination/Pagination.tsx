import React from 'react';
import { PaginationContainer, PageButton, PageInfo } from './Pagination.styled';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isFocused: boolean;
  focusTarget: 'prev' | 'next';
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = React.memo(
  ({ currentPage, totalPages, isFocused, focusTarget, onPrev, onNext }) => {
    if (totalPages <= 1) return null;

    return (
      <PaginationContainer>
        <PageButton
          $isFocused={isFocused && focusTarget === 'prev'}
          $disabled={currentPage <= 1}
          onClick={onPrev}
        >
          Prev
        </PageButton>
        <PageInfo>
          {currentPage} / {totalPages}
        </PageInfo>
        <PageButton
          $isFocused={isFocused && focusTarget === 'next'}
          $disabled={currentPage >= totalPages}
          onClick={onNext}
        >
          Next
        </PageButton>
      </PaginationContainer>
    );
  },
);

Pagination.displayName = 'Pagination';