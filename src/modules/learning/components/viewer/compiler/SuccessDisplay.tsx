"use client";

import React from "react";

interface SuccessDisplayProps {
  output: string;
  mode: 'compilar' | 'evaluar';
  functionName?: string;
}

export function SuccessDisplay({ output, mode, functionName }: SuccessDisplayProps) {
  if (mode === 'compilar') {
    return <CompilationResult output={output} />;
  } else {
    return <EvaluationResult output={output} functionName={functionName} />;
  }
}

function CompilationResult({ output }: { output: string }) {
  try {
    // Intentar parsear como JSON para extraer campos específicos
    const data = JSON.parse(output || '{}');
    const message = data.message;
    const result = data.data?.result || data.result;
    
    return (
      <div className="space-y-3">
        {message && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">💬</span>
              <span className="text-sm font-semibold text-blue-800">Mensaje del sistema:</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">{message}</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg p-4 border border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">💻</span>
            <h4 className="text-sm font-semibold text-gray-800">Salida del programa</h4>
          </div>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-64 whitespace-pre-wrap">
            {result || 'El programa se ejecutó sin generar salida visible.'}
          </div>
        </div>
      </div>
    );
  } catch (e) {
    // Si no es JSON, mostrar como texto plano
    return (
      <div className="bg-white rounded-lg p-4 border border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💻</span>
          <h4 className="text-sm font-semibold text-gray-800">Salida del programa</h4>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-64 whitespace-pre-wrap">
          {output || 'El programa se ejecutó sin generar salida visible.'}
        </div>
      </div>
    );
  }
}

function EvaluationResult({ output, functionName }: { output: string; functionName?: string }) {
  try {
    // Intentar parsear como JSON primero para ver si tiene la estructura de evaluación
    const data = JSON.parse(output || '{}');
    
    // Si tiene estructura de casos de prueba (array de tests)
    if (data.data && Array.isArray(data.data)) {
      const testResults = data.data;
      const successCount = testResults.filter((test: any) => test.result === 'success').length;
      const totalTests = testResults.length;
      
      return (
        <>
          {/* Mensaje de la API si existe */}
          {data.message && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">💬</span>
                <span className="text-sm font-semibold text-blue-800">Mensaje del sistema:</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">{data.message}</p>
            </div>
          )}
          
          {/* Resumen de resultados */}
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <h4 className="text-sm font-semibold text-gray-800">Resumen de Evaluación</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  successCount === totalTests 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {successCount}/{totalTests} exitosos
                </span>
              </div>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(successCount / totalTests) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-xs text-gray-600">
              Función evaluada: <code className="bg-gray-100 px-2 py-1 rounded">{functionName}</code>
            </div>
          </div>
          
          {/* Casos de prueba individuales */}
          <div className="bg-white rounded-lg border border-green-100">
            <div className="p-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
              <h5 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <span>🧪</span>
                Casos de Prueba Detallados
              </h5>
            </div>
            <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
              {testResults.map((test: any, index: number) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  test.result === 'success' 
                    ? 'bg-green-50 border-green-400' 
                    : 'bg-red-50 border-red-400'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-600">
                      Caso #{index + 1}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      test.result === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {test.result === 'success' ? '✅ PASÓ' : '❌ FALLÓ'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Entrada:</span>
                      <div className="font-mono bg-blue-50 px-2 py-1 rounded mt-1">
                        {JSON.stringify(test.input)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Esperado:</span>
                      <div className="font-mono bg-orange-50 px-2 py-1 rounded mt-1">
                        {JSON.stringify(test.expected)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Obtenido:</span>
                      <div className={`font-mono px-2 py-1 rounded mt-1 ${
                        test.result === 'success' 
                          ? 'bg-green-50' 
                          : 'bg-red-50'
                      }`}>
                        {JSON.stringify(test.actual)}
                      </div>
                    </div>
                  </div>
                  {test.result !== 'success' && test.error && (
                    <div className="mt-2 p-2 bg-red-100 rounded text-xs text-red-700">
                      <strong>Error:</strong> {test.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else {
      // Si no tiene estructura de casos de prueba, mostrar como resultado simple
      const message = data.message;
      const result = data.data?.result || data.result || output;
      
      return (
        <div className="bg-white rounded-lg p-4 border border-green-100">
          {message && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-600">💬</span>
                <span className="text-sm font-semibold text-blue-800">Mensaje del sistema:</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">{message}</p>
            </div>
          )}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📋</span>
            <h4 className="text-sm font-semibold text-gray-800">Resultado de evaluación</h4>
          </div>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-64">
            {result || 'Evaluación completada sin salida específica.'}
          </div>
        </div>
      );
    }
  } catch (e) {
    // Si no se puede parsear como JSON, mostrar texto plano pero mejorado
    return (
      <div className="bg-white rounded-lg p-4 border border-green-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📋</span>
          <h4 className="text-sm font-semibold text-gray-800">Resultado de evaluación</h4>
        </div>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto max-h-64 whitespace-pre-wrap">
          {output || 'Evaluación completada.'}
        </div>
      </div>
    );
  }
}
