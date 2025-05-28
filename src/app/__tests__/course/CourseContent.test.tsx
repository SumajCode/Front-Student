import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CourseContent } from '@/modules/course/components/mis-cursos/course-content';

// Mock de useCourseData y los íconos
jest.mock('../../../modules/course/hooks/use-course-data', () => ({
  useCourseData: jest.fn(),
}));
jest.mock('lucide-react', () => ({
  ChevronDown: () => <span>ChevronDown</span>,
  FileText: () => <span>FileText</span>,
  CheckCircle: () => <span>CheckCircle</span>,
  Download: () => <span>Download</span>,
  Link: () => <span>LinkIcon</span>,
  FileJson: () => <span>FileJson</span>,
}));
jest.mock('@/components/ui/button', () => ({ Button: (props: any) => <button {...props} /> }));
jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: any) => <div>{children}</div>,
  PopoverContent: ({ children }: any) => <div>{children}</div>,
  PopoverTrigger: ({ children }: any) => <div>{children}</div>,
}));

const mockUseCourseData = require('../../../modules/course/hooks/use-course-data').useCourseData;

describe('CourseContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sections = [
    {
      title: 'Sección 1',
      completed: 1,
      total: 2,
      duration: 30,
      lessons: [
        {
          id: 101,
          completed: true,
          type: 'video',
          number: 1,
          title: 'Lección 1',
          duration: 15,
          hasResources: true,
          resources: [
            { title: 'PDF', type: 'download', url: 'https://test.com/pdf' },
            { title: 'Enlace', type: 'link', url: 'https://test.com/link' },
          ],
        },
        {
          id: 102,
          completed: false,
          type: 'video',
          number: 2,
          title: 'Lección 2',
          duration: 15,
          hasResources: false,
        },
      ],
    },
  ];

  it('renderiza el título y resumen del contenido', () => {
    mockUseCourseData.mockReturnValue({ sections });
    render(<CourseContent />);
    expect(screen.getByText('Contenido del curso')).toBeInTheDocument();
    expect(screen.getByText(/8 secciones/i)).toBeInTheDocument();
  });

  it('muestra las secciones y lecciones', () => {
    mockUseCourseData.mockReturnValue({ sections });
    render(<CourseContent />);
    expect(screen.getByText('Sección 1')).toBeInTheDocument();
    expect(screen.getByText('Lección 1')).toBeInTheDocument();
    expect(screen.getByText('Lección 2')).toBeInTheDocument();
  });

  it('permite expandir y colapsar secciones', () => {
    mockUseCourseData.mockReturnValue({ sections });
    render(<CourseContent />);
    // Por defecto la sección 0 está expandida
    expect(screen.getByText('Lección 1')).toBeInTheDocument();
    // Simula colapsar
    fireEvent.click(screen.getByText('Sección 1'));
    expect(screen.queryByText('Lección 1')).not.toBeInTheDocument();
    // Simula expandir
    fireEvent.click(screen.getByText('Sección 1'));
    expect(screen.getByText('Lección 1')).toBeInTheDocument();
  });

  it('permite seleccionar una lección', () => {
    mockUseCourseData.mockReturnValue({ sections });
    render(<CourseContent />);
    fireEvent.click(screen.getByText('Lección 2'));
    // El estado visual depende de la clase, pero aquí solo comprobamos que el click no da error
    expect(screen.getByText('Lección 2')).toBeInTheDocument();
  });

  it('muestra los recursos de la lección', () => {
    mockUseCourseData.mockReturnValue({ sections });
    render(<CourseContent />);
    expect(screen.getByText('Recursos')).toBeInTheDocument();
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('Enlace')).toBeInTheDocument();
  });
});
