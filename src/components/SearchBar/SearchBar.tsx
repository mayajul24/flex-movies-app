import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSearchQuery } from '../../store/search/searchActions';
import { SearchContainer, SearchInput } from './SearchBar.styled';

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((s: RootState) => s.search.query);
  const isActive = useSelector((s: RootState) => s.navigation.activeZone === 'search');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    } else if (!isActive && inputRef.current) {
      inputRef.current.blur();
    }
  }, [isActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <SearchContainer $isActive={isActive}>
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={handleChange}
        placeholder="Search movies..."
        $isActive={isActive}
        tabIndex={-1}
      />
    </SearchContainer>
  );
};