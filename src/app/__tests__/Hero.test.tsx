import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '@/modules/course/components/mis-cursos/hero';

describe('Hero', () => {
  it('muestra el tab de video por defecto', () => {
    render(<Hero />);
    expect(screen.getByText('Video')).toHaveClass('bg-gradient-to-r');
    // Busca el iframe por tagName ya que no tiene role accesible
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });

  it('cambia al tab de compilador al hacer click', () => {
    render(<Hero />);
    fireEvent.click(screen.getByText('Compilador'));
    expect(screen.getByText('Compilador')).toHaveClass('bg-gradient-to-r');
    expect(screen.getByText('// Tu código aquí')).toBeInTheDocument();
  });

  it('vuelve al tab de video al hacer click en Video', () => {
    render(<Hero />);
    fireEvent.click(screen.getByText('Compilador'));
    fireEvent.click(screen.getByText('Video'));
    expect(screen.getByText('Video')).toHaveClass('bg-gradient-to-r');
    const iframe = document.querySelector('iframe');
    expect(iframe).toBeInTheDocument();
  });
});
