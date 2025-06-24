import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PreviousModuleButton from '@/modules/course/components/PreviousModuleButton';

// Mock del hook useCourseNavigation
jest.mock('../../../modules/course/hooks/useCourseNavigation', () => ({
  useCourseNavigation: jest.fn(),
}));

const mockUseCourseNavigation = require('../../../modules/course/hooks/useCourseNavigation').useCourseNavigation;

describe('PreviousModuleButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('no renderiza el botón si currentModuleId es 1', () => {
    mockUseCourseNavigation.mockReturnValue({
      currentModuleId: 1,
      navigateToPreviousModule: jest.fn(),
    });
    const { container } = render(<PreviousModuleButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renderiza el botón si currentModuleId es mayor a 1', () => {
    mockUseCourseNavigation.mockReturnValue({
      currentModuleId: 2,
      navigateToPreviousModule: jest.fn(),
    });
    render(<PreviousModuleButton />);
    expect(screen.getByText('← Módulo anterior')).toBeInTheDocument();
  });

  it('llama a navigateToPreviousModule al hacer click', () => {
    const navigateToPreviousModule = jest.fn();
    mockUseCourseNavigation.mockReturnValue({
      currentModuleId: 3,
      navigateToPreviousModule,
    });
    render(<PreviousModuleButton />);
    fireEvent.click(screen.getByText('← Módulo anterior'));
    expect(navigateToPreviousModule).toHaveBeenCalled();
  });
});
