/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect} from "react";
import { useMediaQuery } from 'react-responsive';

export function useScroll(parentRef: React.RefObject<HTMLUListElement> | React.MutableRefObject<undefined>, childRef: React.RefObject<HTMLLIElement>, callback: () => void) {
  const mobile: boolean = useMediaQuery({ query: `(max-width: 760px)` });
  const tablet: boolean = useMediaQuery({ query: `(max-width: 1300px)` });

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
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
    
    observer.current.observe(childRef.current!);

    const child = childRef.current

    return function() {
      observer.current?.unobserve(child!);
    }
  }, [callback]);
}