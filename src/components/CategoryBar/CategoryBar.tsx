import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Category } from '../../types/movie';
import { categoryClicked } from '../../store/navigation/navigationActions';
import { CategoryBarContainer, CategoryTab } from './CategoryBar.styled';

const categories: Array<{ key: Category; label: string }> = [
  { key: 'popular', label: 'Popular' },
  { key: 'now_playing', label: 'Now Playing' },
  { key: 'favorites', label: 'My Favorites' },
];

export const CategoryBar: React.FC = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((s: RootState) => s.movies.activeCategory);
  const activeZone = useSelector((s: RootState) => s.navigation.activeZone);
  const categoryIndex = useSelector((s: RootState) => s.navigation.categoryIndex);
  const isCategoryZoneActive = activeZone === 'categories';

  return (
    <CategoryBarContainer>
      {categories.map((cat, index) => (
        <CategoryTab
          key={cat.key}
          $isActive={activeCategory === cat.key}
          $isFocused={isCategoryZoneActive && categoryIndex === index}
          onClick={() => dispatch(categoryClicked(cat.key))}
        >
          {cat.label}
        </CategoryTab>
      ))}
    </CategoryBarContainer>
  );
};