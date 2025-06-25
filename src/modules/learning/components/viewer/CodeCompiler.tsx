"use client";

import React, { useState } from "react";
import { Button } from "@/ui/button";
import { compiladorDirectoService } from "@/lib/gateway-service";

interface CompilationResult {
  output?: string;
  error?: string;
  status: 'success' | 'error' | 'running';
  exitCode?: number;
}

export function CodeCompiler() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState<CompilationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [modo, setModo] = useState<'compilar' | 'evaluar'>('compilar');

  const ejecutarCodigo = async () => {
    if (!codigo.trim()) {
      setResultado({
        status: 'error',
        error: 'Por favor, escriba algo de código antes de ejecutar.'
      });
      return;
    }

    setLoading(true);
    setResultado({ status: 'running' });

    try {
      console.log(`${modo === 'compilar' ? 'Compilando' : 'Evaluando'} código:`, codigo);
      
      // Usar el servicio directo del compilador
      const response = modo === 'compilar' 
        ? await compiladorDirectoService.compilar({
            codigo: codigo,
            lenguaje: 'python'
          })
        : await compiladorDirectoService.evaluar({
            codigo: codigo,
            lenguaje: 'python'
          });
      
      console.log('Respuesta del compilador:', response);

      if (response.success) {
        const data = response.data as any;
        setResultado({
          status: 'success',
          output: data.output || data.resultado || data.salida || data.stdout || JSON.stringify(data, null, 2),
          exitCode: data.exitCode || data.exit_code || 0
        });
      } else {
        setResultado({
          status: 'error',
          error: response.data?.error || response.data?.message || JSON.stringify(response.data) || 'Error desconocido durante la compilación'
        });
      }
      
    } catch (error: any) {
      console.error('Error completo:', error);
      setResultado({
        status: 'error',
        error: error.message || 'Error de conexión con el compilador'
      });
    } finally {
      setLoading(false);
    }
  };

  const limpiarEditor = () => {
    setCodigo('');
    setResultado(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header con controles */}
      <div className="bg-white border-b p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Indicador de lenguaje y modo */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Lenguaje: Python</span>
            <div className="flex bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setModo('compilar')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  modo === 'compilar'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Compilar
              </button>
              <button
                onClick={() => setModo('evaluar')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  modo === 'evaluar'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Evaluar
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 ml-auto">
            <Button
              onClick={limpiarEditor}
              variant="outline"
              size="sm"
            >
              Limpiar
            </Button>
            <Button
              onClick={ejecutarCodigo}
              disabled={loading}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'Ejecutando...' : modo === 'compilar' ? 'Compilar' : 'Evaluar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex gap-4 p-4">
        {/* Panel del editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-lg border shadow-sm flex-1 flex flex-col">
            <div className="p-3 border-b bg-gray-50 rounded-t-lg">
              <h3 className="text-sm font-medium text-gray-700">
                Editor de Código (Python)
              </h3>
            </div>
            <textarea
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="flex-1 p-4 font-mono text-sm border-0 resize-none focus:outline-none focus:ring-0"
              placeholder='print("Hello World")'
              style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
            />
          </div>
        </div>

        {/* Panel de resultados */}
        <div className="w-96 flex flex-col">
          <div className="bg-white rounded-lg border shadow-sm flex-1 flex flex-col">
            <div className="p-3 border-b bg-gray-50 rounded-t-lg">
              <h3 className="text-sm font-medium text-gray-700">
                Resultado de Ejecución
              </h3>
            </div>
            
            <div className="flex-1 p-4">
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    <span className="text-sm">Ejecutando código...</span>
                  </div>
                </div>
              )}

              {!loading && resultado && (
                <div className="space-y-3">
                  {resultado.status === 'success' && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">Ejecución exitosa</span>
                      </div>
                      <pre className="text-sm text-green-700 whitespace-pre-wrap font-mono">
                        {resultado.output}
                      </pre>
                    </div>
                  )}

                  {resultado.status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium text-red-800">Error de ejecución</span>
                      </div>
                      <pre className="text-sm text-red-700 whitespace-pre-wrap font-mono">
                        {resultado.error}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {!loading && !resultado && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🐍</div>                    <p className="text-sm">
                      Escribe tu código Python y presiona &ldquo;Ejecutar&rdquo; para ver los resultados
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
