import { RefObject, useCallback, useRef } from 'react';
import { TextInput } from 'react-native';

/**
 * Returns a reference to but on a TextInput, and a callback, to focus that
 * referenced input.
 */
export function useFocusInput(): [RefObject<TextInput>, () => void] {
  const ref: RefObject<TextInput> = useRef(null);

  const callback = useCallback(() => {
    const { current } = ref;
    if (!current) {
      return;
    }

    current.focus();
  }, [ref]);

  return [ref, callback];
}

export function useFocusAndBlurInput(): [
  RefObject<TextInput>,
  () => void,
  () => void
] {
  const [ref, callbackFocus] = useFocusInput();

  const callbackBlur = useCallback(() => {
    const { current } = ref;
    if (!current) {
      return;
    }

    current.blur();
  }, [ref]);

  return [ref, callbackFocus, callbackBlur];
}
