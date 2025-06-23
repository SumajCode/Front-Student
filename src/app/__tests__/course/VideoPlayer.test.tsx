import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from '@/modules/course/components/VideoPlayer';

describe('VideoPlayer', () => {
  const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

  it('renderiza el iframe con el src correcto', () => {
    render(<VideoPlayer videoUrl={videoUrl} />);
    const iframe = screen.getByTitle('Video del curso');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', videoUrl);
    expect(iframe).toHaveClass('w-full', 'h-full');
  });

  it('tiene los atributos de seguridad y permisos correctos', () => {
    render(<VideoPlayer videoUrl={videoUrl} />);
    const iframe = screen.getByTitle('Video del curso');
    expect(iframe).toHaveAttribute('allow', expect.stringContaining('autoplay'));
    expect(iframe).toHaveAttribute('allowFullScreen');
  });
});
