import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from '@/modules/learning/components/dashboard/CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'Test Course',
    description: 'Test Description',
    progress: 50,
    duration: '2h 30m',
    instructor: 'Test Instructor'
  };

  it('renders course information correctly', () => {
    render(<CourseCard {...mockCourse} />);
    
    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
    expect(screen.getByText(mockCourse.description)).toBeInTheDocument();
    expect(screen.getByText(`${mockCourse.progress}% completado`)).toBeInTheDocument();
    expect(screen.getByText(mockCourse.instructor)).toBeInTheDocument();
  });

  it('displays correct button text based on progress', () => {
    const notStartedCourse = { ...mockCourse, progress: 0 };
    const { rerender } = render(<CourseCard {...notStartedCourse} />);
    expect(screen.getByText('Comenzar curso')).toBeInTheDocument();

    const inProgressCourse = { ...mockCourse, progress: 50 };
    rerender(<CourseCard {...inProgressCourse} />);
    expect(screen.getByText('Continuar aprendiendo')).toBeInTheDocument();

    const completedCourse = { ...mockCourse, progress: 100 };
    rerender(<CourseCard {...completedCourse} />);
    expect(screen.getByText('Repasar curso')).toBeInTheDocument();
  });
});
