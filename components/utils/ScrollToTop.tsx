"use client";

import { useEffect } from "react";

export const ScrollToTop = () => {
  useEffect(() => {
    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }
    
    // Force scroll to top
    window.scrollTo(0, 0);

    // Optional: Ensure it happens after a slight delay to override any race conditions
    const timer = setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return null;
};
