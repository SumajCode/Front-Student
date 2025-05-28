import React from 'react';
import { render, screen } from '@testing-library/react';
import { CourseInfo } from '@/modules/course/components/mis-cursos/course-info';

describe('CourseInfo', () => {
  it('renderiza la descripción general del curso', () => {
    render(<CourseInfo />);
    expect(screen.getByText('Descripción general')).toBeInTheDocument();
    expect(screen.getByText(/Esta es una descripción general del curso/i)).toBeInTheDocument();
    expect(screen.getByText(/información sobre los temas/i)).toBeInTheDocument();
  });
});
