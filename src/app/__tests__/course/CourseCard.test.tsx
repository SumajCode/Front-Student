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

  it('muestra el título, lección y duración', () => {
    render(<CourseCard {...props} />);
    expect(screen.getByText('Curso de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Lección 1')).toBeInTheDocument();
    expect(screen.getByText('2h 30m')).toBeInTheDocument();
  });

  it('muestra el iframe del video', () => {
    render(<CourseCard {...props} />);
    const iframe = screen.getByTitle('Curso de Prueba');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', props.videoUrl);
  });

  it('abre y cierra el menú contextual', () => {
    render(<CourseCard {...props} />);
    const menuButton = screen.getByRole('button', { name: /⋮/ });
    fireEvent.click(menuButton);
    expect(screen.getByText('Recomendar')).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(screen.queryByText('Recomendar')).not.toBeInTheDocument();
  });
});
