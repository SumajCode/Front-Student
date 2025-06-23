import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from '@/components/CourseCard';

describe('CourseCard', () => {
  const props = {
    title: 'Curso de Prueba',
    lesson: 'Lección 1',
    duration: '2h 30m',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  };

  it('muestra el título y duración', () => {
    render(<CourseCard {...props} />);
    expect(screen.getByText('Curso de Prueba')).toBeInTheDocument();
    expect(screen.getByText('2h 30m')).toBeInTheDocument();
  });

  it('abre y cierra el menú contextual', () => {
    render(<CourseCard {...props} />);
    const menuButton = screen.getByText('Opciones');
    fireEvent.click(menuButton);
    // Aquí puedes agregar asserts para verificar que el menú se abre, por ejemplo:
    // expect(screen.getByText('Recomendar')).toBeInTheDocument();
  });
});
