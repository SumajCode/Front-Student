"use client";

import React from "react";
import { SuccessDisplay } from "./SuccessDisplay";
import { ErrorDisplay } from "./ErrorDisplay";

interface CompilationResult {
  output?: string;
  error?: string;
  status: 'success' | 'error' | 'running';
  exitCode?: number;
}

interface ResultsPanelProps {
  modo: 'compilar' | 'evaluar';
  loading: boolean;
  resultado: CompilationResult | null;
  functionName?: string;
}

export function ResultsPanel({ modo, loading, resultado, functionName }: ResultsPanelProps) {
  return (
    <div className="bg-white rounded-xl border shadow-lg flex-1 flex flex-col overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">📊</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">
              Resultado de {modo === 'compilar' ? 'Compilación' : 'Evaluación'}
            </h3>
            <p className="text-xs text-gray-500">
              {modo === 'compilar' ? 'Salida del código' : 'Resultados de las pruebas'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 bg-gray-50">
        {loading && <LoadingState modo={modo} />}
        
        {!loading && resultado && (
          <div className="space-y-4">
            {resultado.status === 'success' && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">✅</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-green-800">
                      {modo === 'compilar' ? '¡Compilación exitosa!' : '¡Evaluación completada!'}
                    </span>
                    <p className="text-xs text-green-600">
                      {modo === 'compilar' ? 'Tu código se ejecutó correctamente' : 'Todas las pruebas fueron procesadas'}
                    </p>
                  </div>
                </div>
                
                <SuccessDisplay 
                  output={resultado.output || ''} 
                  mode={modo} 
                  functionName={functionName}
                />
              </div>
            )}

            {resultado.status === 'error' && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-lg">❌</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-red-800">
                      Error de {modo === 'compilar' ? 'compilación' : 'evaluación'}
                    </span>
                    <p className="text-xs text-red-600">
                      {modo === 'compilar' ? 'Revisa tu código y vuelve a intentar' : 'Verifica la configuración de pruebas'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-red-100">
                  <div className="p-3 bg-red-50 border-b border-red-200 rounded-t-lg">
                    <h5 className="text-sm font-semibold text-red-800 flex items-center gap-2">
                      <span>🚨</span>
                      Detalles del Error
                    </h5>
                  </div>
                  <div className="p-4">
                    <ErrorDisplay error={resultado.error || ''} mode={modo} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && !resultado && <EmptyState modo={modo} />}
      </div>
    </div>
  );
}

function LoadingState({ modo }: { modo: 'compilar' | 'evaluar' }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-white border-t-transparent"></div>
        </div>
        <span className="text-sm font-medium text-gray-600">
          {modo === 'compilar' ? 'Compilando' : 'Evaluando'} tu código...
        </span>
        <p className="text-xs text-gray-500 mt-1">Esto puede tomar unos segundos</p>
      </div>
    </div>
  );
}

function EmptyState({ modo }: { modo: 'compilar' | 'evaluar' }) {
  return (
    <div className="flex items-center justify-center h-full text-gray-500">
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
          <span className="text-3xl">{modo === 'compilar' ? '⚡' : '🧪'}</span>
        </div>
        <h4 className="font-semibold text-gray-700 mb-2">
          {modo === 'compilar' ? 'Listo para compilar' : 'Listo para evaluar'}
        </h4>
        <p className="text-sm text-gray-500 max-w-xs">
          {modo === 'compilar' 
            ? 'Escribe tu código Python y presiona "Compilar" para ver los resultados'
            : 'Configura tu función y casos de prueba, luego presiona "Evaluar"'
          }
        </p>
      </div>
    </div>
  );
}
