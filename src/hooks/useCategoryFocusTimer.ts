import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Category } from '../types/movie';
import { categoryFocused } from '../store/navigation/navigationActions';

const categories: Category[] = ['popular', 'now_playing', 'favorites'];

export function useCategoryFocusTimer() {
  const dispatch = useDispatch();
  const activeZone = useSelector((s: RootState) => s.navigation.activeZone);
  const categoryIndex = useSelector((s: RootState) => s.navigation.categoryIndex);
  const prevRef = useRef<{ zone: string; index: number } | null>(null);

  useEffect(() => {
    if (activeZone === 'categories') {
      const prev = prevRef.current;
      if (!prev || prev.zone !== 'categories' || prev.index !== categoryIndex) {
        dispatch(categoryFocused(categories[categoryIndex]));
      }
    }
    prevRef.current = { zone: activeZone, index: categoryIndex };
  }, [activeZone, categoryIndex, dispatch]);
}