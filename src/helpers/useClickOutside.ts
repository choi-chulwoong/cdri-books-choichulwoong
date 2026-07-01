import { useEffect, useRef, type RefObject } from 'react';

type UseOutsideClick<T extends HTMLElement> = (
  refs: RefObject<T | null>[],
  closeCallback: () => void
) => void;

const useClickOutside: UseOutsideClick<HTMLElement> = (refs, closeCallback) => {
  const savedCallback = useRef(closeCallback);
  const savedRefs = useRef(refs);

  useEffect(() => {
    savedCallback.current = closeCallback;
    savedRefs.current = refs;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInside = savedRefs.current.some((ref) => ref.current?.contains(target));
      if (!isInside) {
        savedCallback.current();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
};

export default useClickOutside;
