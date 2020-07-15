import { useMediaQuery } from 'react-responsive';

const X_SMALL_SCREEN = 0;
const SMALL_SCREEN = 600;
const MEDIUM_SCREEN = 960;
const LARGE_SCREEN = 1280;
const X_LARGE_SCREEN = 1920;

export default function useResponsive() {
  const isXSmall = useMediaQuery({ minWidth: X_SMALL_SCREEN });
  const isSmall = useMediaQuery({ minWidth: SMALL_SCREEN });
  const isMedium = useMediaQuery({ minWidth: MEDIUM_SCREEN });
  const isLarge = useMediaQuery({ minWidth: LARGE_SCREEN });
  const isXLarge = useMediaQuery({ minWidth: X_LARGE_SCREEN });

  return {
    isXSmall,
    isSmall,
    isMedium,
    isLarge,
    isXLarge
  };
}
