import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/modules/course/components/theme-provider';

// Componente de prueba para renderizar children
function DummyChild() {
  return <div>Contenido de prueba</div>;
}

describe('ThemeProvider', () => {
  it('renderiza los children correctamente', () => {
    const { getByText } = render(
      <ThemeProvider attribute="class">
        <DummyChild />
      </ThemeProvider>
    );
    expect(getByText('Contenido de prueba')).toBeInTheDocument();
  });
});
