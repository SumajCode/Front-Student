import '@testing-library/jest-dom';

// Mock window.matchMedia para tests con next-themes o componentes que lo usen
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      dispatchEvent: () => false,
      onchange: null,
      media: '',
    };
  };
}