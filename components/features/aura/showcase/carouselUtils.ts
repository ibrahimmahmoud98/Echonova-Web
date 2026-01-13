import { CarouselItemStyle } from "./CarouselSlide";

/**
 * Calculates the visual style for a carousel item based on its position relative to the current index.
 * 
 * @description Creates a 3D perspective carousel effect where:
 * - Center item (diff=0): Full size, no rotation, fully visible
 * - Adjacent items (diff=1 or n-1): Scaled down, slightly rotated, dimmed
 * - Distant items (diff=2 or n-2): Further scaled, more rotation, heavily dimmed
 * - Hidden items: Invisible, positioned off-screen
 * 
 * @param index - The index of the item to style
 * @param currentIndex - The currently active/center item index
 * @param totalItems - Total number of items in the carousel
 * @returns Style object for framer-motion animate prop
 * 
 * @example
 * ```tsx
 * const style = getCarouselItemStyle(2, 1, 5);
 * // Returns style for item after the center
 * ```
 */
export const getCarouselItemStyle = (
  index: number, 
  currentIndex: number, 
  totalItems: number
): CarouselItemStyle => {
  const diff = (index - currentIndex + totalItems) % totalItems;
  
  // Center Card
  if (diff === 0) {
    return {
      zIndex: 30,
      scale: 1,
      opacity: 1,
      x: '0%',
      rotateY: 0,
      filter: 'brightness(1)',
      pointerEvents: 'auto',
    };
  }
  
  // Next Card (Right)
  if (diff === 1 || diff === -totalItems + 1) {
    return {
      zIndex: 20,
      scale: 0.85,
      opacity: 0.7,
      x: '60%',
      rotateY: -15,
      filter: 'brightness(0.5) blur(1px)',
      cursor: 'pointer',
      pointerEvents: 'auto',
    };
  }

  // Previous Card (Left)
  if (diff === totalItems - 1 || diff === -1) {
    return {
      zIndex: 20,
      scale: 0.85,
      opacity: 0.7,
      x: '-60%',
      rotateY: 15,
      filter: 'brightness(0.5) blur(1px)',
      cursor: 'pointer',
      pointerEvents: 'auto',
    };
  }

  // Distant Next
  if (diff === 2 || diff === -totalItems + 2) {
    return {
      zIndex: 10,
      scale: 0.75,
      opacity: 0.4,
      x: '110%',
      rotateY: -25,
      filter: 'brightness(0.3) blur(3px)',
      cursor: 'pointer',
      pointerEvents: 'auto',
    };
  }

  // Distant Previous
  if (diff === totalItems - 2 || diff === -2) {
    return {
      zIndex: 10,
      scale: 0.75,
      opacity: 0.4,
      x: '-110%',
      rotateY: 25,
      filter: 'brightness(0.3) blur(3px)',
      cursor: 'pointer',
      pointerEvents: 'auto',
    };
  }

  // Hidden others
  return {
    zIndex: 5,
    scale: 0.6,
    opacity: 0,
    x: diff > 0 && diff < totalItems / 2 ? '150%' : '-150%',
    rotateY: 0,
    filter: 'brightness(0)',
    pointerEvents: 'none',
  };
};
