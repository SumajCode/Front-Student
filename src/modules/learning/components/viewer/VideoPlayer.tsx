"use client";
import React from "react";

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
}

export default function VideoPlayer({ videoUrl, title = "Course Video" }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  // Agregar parámetros a la URL para mejorar la experiencia
  const enhancedUrl = `${videoUrl}?autoplay=0&rel=0&modestbranding=1&showinfo=0`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <div className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
            <p>Error al cargar el video. Por favor, intenta más tarde.</p>
          </div>
        ) : (        <iframe
            className="w-full h-full"
            src={enhancedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-presentation"
          />
        )}
      </div>
    </div>
  );
}
