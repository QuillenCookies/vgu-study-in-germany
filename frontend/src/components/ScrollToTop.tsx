import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the absolute top of the page on every route change instantly
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
