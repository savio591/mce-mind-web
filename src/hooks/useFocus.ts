import { RefObject } from 'react';
import { useRef } from 'react';

export const useFocus: () => (RefObject<HTMLInputElement> | (() => void))[] =
  () => {
    const htmlElRef = useRef<HTMLInputElement>(null);
    const setFocus = (): void => {
      // eslint-disable-next-line no-unused-expressions
      htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };
