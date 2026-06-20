/**
 * useToast — lightweight toast notification hook
 */
import { useState, useCallback, useRef } from 'react';

let _id = 0;

/**
 * @returns {{ toasts, toast, dismiss }}
 */
export function useToast() {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const toast = useCallback(({ message, type = 'success', duration = 3000 }) => {
    const id = ++_id;
    setToasts(prev => [...prev, { id, message, type }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  return { toasts, toast, dismiss };
}
