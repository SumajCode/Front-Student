"use client";

import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State para almacenar nuestro valor
  // Pasar función inicial para useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Devolver una versión envuelta de la función setter de useState que persiste
  // el nuevo valor en localStorage.
  const setValue = (value: T | ((_val: T) => T)) => {
    try {
      // Permitir que value sea una función para que tengamos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (_error) {
      console.warn(`Error setting localStorage key "${key}":`, _error);
    }
  };

  return [storedValue, setValue] as const;
}
