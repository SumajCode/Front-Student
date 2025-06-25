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
    
    // Si el resultado es un array de evaluaciones múltiples (en el campo result)
    if (data.result && Array.isArray(data.result) && data.result.length > 0) {
      return <MultipleEvaluationResults data={data.result} functionName={functionName} message={data.message} />;
    }
    
    // Si el resultado es un array de evaluaciones múltiples (directamente)
    if (Array.isArray(data) && data.length > 0 && data[0].result) {
      return <MultipleEvaluationResults data={data} functionName={functionName} />;
    }
    
    // Si el resultado viene en formato de texto estructurado (como en tu imagen)
    if (data.result && typeof data.result === 'string' && data.result.includes('Resultado esperado')) {
      return <ParsedEvaluationResult data={data} functionName={functionName} />;
    }
    
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
      );    } else {
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

function ParsedEvaluationResult({ data, functionName }: { data: any; functionName?: string }) {
  const { result, memoriaUso = 0, tiempoEjecucion = 0 } = data;
  
  // Parsear el resultado de texto para extraer información útil
  const lines = result.split('\n').filter((line: string) => line.trim());
  
  // Extraer información específica del resultado
  let status = 'unknown';
  let expectedResult = '';
  let actualResult = '';
  let message = '';
  
  lines.forEach((line: string) => {
    if (line.includes('Resultado esperado incorrecto')) {
      status = 'failed';
    } else if (line.includes('Resultado esperado correcto') || line.includes('correcto')) {
      status = 'success';
    } else if (line.startsWith('Resultado obtenido:')) {
      actualResult = line.replace('Resultado obtenido:', '').trim();
    } else if (line.startsWith('Resultado esperado:')) {
      expectedResult = line.replace('Resultado esperado:', '').trim();
    } else if (line.includes('Mejor revisas') || line.includes('xd')) {
      message = line;
    }
  });
  
  const isSuccess = status === 'success';
  
  return (
    <>
      {/* Resumen de evaluación */}
      <div className="bg-white rounded-lg p-4 border border-green-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h4 className="text-sm font-semibold text-gray-800">Resultado de Evaluación</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isSuccess 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isSuccess ? '✅ CORRECTO' : '❌ INCORRECTO'}
            </span>
          </div>
        </div>
        
        {functionName && (
          <div className="text-xs text-gray-600 mb-3">
            Función evaluada: <code className="bg-gray-100 px-2 py-1 rounded">{functionName}</code>
          </div>
        )}
        
        {/* Resultados comparados */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className={`p-3 rounded-lg border-l-4 ${
            isSuccess ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
          }`}>
            <div className="text-xs font-semibold text-gray-600 mb-1">Resultado Obtenido</div>
            <div className="font-mono text-sm bg-white px-2 py-1 rounded">
              {actualResult || 'Sin resultado específico'}
            </div>
          </div>
          <div className="p-3 rounded-lg border-l-4 bg-blue-50 border-blue-400">
            <div className="text-xs font-semibold text-gray-600 mb-1">Resultado Esperado</div>
            <div className="font-mono text-sm bg-white px-2 py-1 rounded">
              {expectedResult || 'No especificado'}
            </div>
          </div>
        </div>
        
        {/* Mensaje de evaluación */}
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            isSuccess 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
          }`}>
            <div className="flex items-center gap-2">
              <span>{isSuccess ? '👍' : '💡'}</span>
              <span className="font-medium">Comentario:</span>
            </div>
            <p className="mt-1">{message}</p>
          </div>
        )}
        
        {/* Métricas de rendimiento */}
        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-xs text-gray-500">Tiempo de Ejecución</div>
            <div className="text-sm font-semibold text-purple-600">
              {tiempoEjecucion.toFixed(4)}s
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Memoria Utilizada</div>
            <div className="text-sm font-semibold text-purple-600">
              {memoriaUso} MB
            </div>
          </div>
        </div>
      </div>
      
      {/* Detalles completos (collapsed) */}
      <details className="bg-white rounded-lg border border-gray-200">
        <summary className="p-3 cursor-pointer hover:bg-gray-50 text-sm font-medium text-gray-700">
          📋 Ver detalles completos de la evaluación
        </summary>
        <div className="p-3 border-t border-gray-200">
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-auto max-h-32 whitespace-pre-wrap">
            {result}
          </div>
        </div>
      </details>
    </>
  );
}

function MultipleEvaluationResults({ data, functionName, message }: { 
  data: any[]; 
  functionName?: string; 
  message?: string; 
}) {
  const successCount = data.filter(test => 
    test.result === 'success' || 
    test.result === 'correcto' || 
    test.status === 'passed' ||
    (test.passed !== undefined ? test.passed : false)
  ).length;
  const totalTests = data.length;
  const successRate = (successCount / totalTests) * 100;

  return (
    <div className="space-y-4">
      {/* Mensaje del sistema si existe */}
      {message && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <span className="text-blue-600">💬</span>
            <span className="text-sm font-semibold text-blue-800">Mensaje del sistema:</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">{message}</p>
        </div>
      )}

      {/* Resumen general */}
      <div className="bg-white rounded-lg border border-green-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h4 className="text-lg font-bold text-gray-800">
              Resultados de Evaluación {functionName && `- ${functionName}`}
            </h4>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
            successRate === 100 
              ? 'bg-green-100 text-green-800' 
              : successRate >= 70 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {successCount}/{totalTests} casos exitosos
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              successRate === 100 
                ? 'bg-green-500' 
                : successRate >= 70 
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
            style={{ width: `${successRate}%` }}
          />
        </div>

        {/* Estadísticas resumidas */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{successCount}</div>
            <div className="text-xs text-green-700">Exitosos</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-600">{totalTests - successCount}</div>
            <div className="text-xs text-red-700">Fallidos</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{successRate.toFixed(0)}%</div>
            <div className="text-xs text-blue-700">Éxito</div>
          </div>
        </div>
      </div>

      {/* Detalles de cada caso de prueba */}
      <div className="bg-white rounded-lg border border-green-100">
        <div className="p-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <h5 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <span>🧪</span>
            Casos de Prueba Detallados
          </h5>
        </div>
        <div className="p-3 space-y-3 max-h-64 overflow-y-auto">
          {data.map((test: any, index: number) => {
            const isSuccess = test.result === 'success' || 
                             test.result === 'correcto' || 
                             test.status === 'passed' ||
                             (test.passed !== undefined ? test.passed : false);
            
            return (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                isSuccess 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-red-50 border-red-400'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600">
                    Caso #{index + 1}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isSuccess 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {isSuccess ? '✅ CORRECTO' : '❌ INCORRECTO'}
                  </span>
                </div>
                
                {/* Entrada y salida esperada/obtenida */}
                {test.input !== undefined && (
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gray-600">Entrada:</span>
                    <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                      {JSON.stringify(test.input)}
                    </code>
                  </div>
                )}
                
                {test.expected !== undefined && (
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gray-600">Esperado:</span>
                    <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                      {JSON.stringify(test.expected)}
                    </code>
                  </div>
                )}
                
                {test.actual !== undefined && (
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-gray-600">Obtenido:</span>
                    <code className={`ml-2 text-xs px-2 py-1 rounded ${
                      isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {JSON.stringify(test.actual)}
                    </code>
                  </div>
                )}
                
                {/* Descripción o comentario del caso */}
                {test.description && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-semibold">Descripción:</span> {test.description}
                  </div>
                )}
                
                {test.message && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-semibold">Mensaje:</span> {test.message}
                  </div>
                )}
                
                {/* Métricas si están disponibles */}
                {(test.executionTime || test.memoryUsage) && (
                  <div className="mt-2 flex gap-3 text-xs text-gray-500">
                    {test.executionTime && (
                      <span>⏱️ {test.executionTime}ms</span>
                    )}
                    {test.memoryUsage && (
                      <span>💾 {test.memoryUsage}MB</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}