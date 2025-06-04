import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeaderCourse from '@/modules/course/components/HeaderCourse';

// Mock de useCourseNavigation y ProgressBar
jest.mock('../../../modules/course/hooks/useCourseNavigation', () => ({
  useCourseNavigation: jest.fn(),
}));
jest.mock('../../../modules/course/components/ProgressBar', () => () => <div>Barra de progreso</div>);

const mockUseCourseNavigation = require('../../../modules/course/hooks/useCourseNavigation').useCourseNavigation;

describe('HeaderCourse', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el título del módulo actual', () => {
    mockUseCourseNavigation.mockReturnValue({
      currentModule: { title: 'Módulo de Prueba' },
      currentModuleId: 2,
    });
    render(<HeaderCourse />);
    expect(screen.getByText('Módulo de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Barra de progreso')).toBeInTheDocument();
  });

  it('muestra "Cargando..." si no hay módulo actual', () => {
    mockUseCourseNavigation.mockReturnValue({
      currentModule: null,
      currentModuleId: 2,
    });
    render(<HeaderCourse />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('muestra el botón de completar solo en el último módulo', () => {
    mockUseCourseNavigation.mockReturnValue({
      currentModule: { title: 'Último módulo' },
      currentModuleId: 4,
    });
    render(<HeaderCourse />);
    expect(screen.getByText('Marcar como completado ✅')).toBeInTheDocument();
  });

  it('al hacer click en "Marcar como completado" muestra el mensaje de completado', () => {
    mockUseCourseNavigation.mockReturnValue({
      currentModule: { title: 'Último módulo' },
      currentModuleId: 4,
    });
    window.alert = jest.fn();
    render(<HeaderCourse />);
    fireEvent.click(screen.getByText('Marcar como completado ✅'));
    expect(window.alert).toHaveBeenCalledWith('✅ Curso completado con éxito');
    // El texto de completado aparece después del click
    expect(screen.getByText('Módulo completado ✔️')).toBeInTheDocument();
  });
});
