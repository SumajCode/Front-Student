import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NextModuleButton from '@/modules/course/components/NextModuleButton';

// Mock del hook useCourseNavigation
jest.mock('../../modules/course/hooks/useCourseNavigation', () => ({
  useCourseNavigation: jest.fn(),
}));

const mockUseCourseNavigation = require('../../modules/course/hooks/useCourseNavigation').useCourseNavigation;

describe('NextModuleButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza el botón correctamente', () => {
    mockUseCourseNavigation.mockReturnValue({
      navigateToNextModule: jest.fn(),
    });
    render(<NextModuleButton />);
    expect(screen.getByText('Continuar curso →')).toBeInTheDocument();
  });

  it('llama a navigateToNextModule al hacer click', () => {
    const navigateToNextModule = jest.fn();
    mockUseCourseNavigation.mockReturnValue({
      navigateToNextModule,
    });
    render(<NextModuleButton />);
    fireEvent.click(screen.getByText('Continuar curso →'));
    expect(navigateToNextModule).toHaveBeenCalled();
  });
});
