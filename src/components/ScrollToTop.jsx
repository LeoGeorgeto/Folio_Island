import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable the browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    document.body.style.position = 'relative';
  }, [pathname]);

  // Also handle scroll on initial page load
  useEffect(() => {
    // Disable the browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTop;