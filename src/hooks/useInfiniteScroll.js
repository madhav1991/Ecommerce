import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  const observer = useRef();
  useEffect(() => {
    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsBottom(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (observer.current && !isFetching) {
      observer.current.observe(document.querySelector('#scrollObserverSelector'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isFetching]);

  useEffect(() => {
    if (isBottom && !isFetching) {
      callback();
      setIsFetching(false);
      setIsBottom(false);
    }
  }, [isBottom, isFetching, callback]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
