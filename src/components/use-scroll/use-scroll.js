/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMediaQuery } from 'react-responsive';

export function useScroll(parentRef, childRef, callback) {
  const mobile = useMediaQuery({ query: `(max-width: 760px)` });
  const tablet = useMediaQuery({ query: `(max-width: 1300px)` });

  const observer = React.useRef();

  React.useEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: '0px',
      threshold: mobile ? 0.0 : tablet ? 0.4 : 0.3
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback();
      }
    }, options)
    
    observer.current.observe(childRef.current);

    const child = childRef.current

    return function() {
      observer.current.unobserve(child);
    }
  }, [callback]);
}