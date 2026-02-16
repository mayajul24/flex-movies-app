import { useEffect } from 'react';

export function useDisableDefaults() {
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => e.preventDefault();
    const preventTouchMove = (e: TouchEvent) => e.preventDefault();

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventTouchMove);
    };
  }, []);
}