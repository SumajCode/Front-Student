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
    <div className="relative h-full w-full bg-black">
      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
            <div className="relative mb-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/30 border-t-purple-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-400 text-sm animate-pulse">Cargando video...</p>
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/20 to-black text-white z-10">
            <div className="text-center p-8">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Error al cargar el video</h3>
              <p className="text-gray-400 mb-4">No se pudo cargar el contenido del video. Por favor, intenta más tarde.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
              >
                Reintentar
              </button>
            </div>
          </div>
        ) : (
          <iframe
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
        
        {/* Overlay sutil de controles cuando no está cargando */}
        {!isLoading && !error && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2 text-white text-xs">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>En vivo</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
