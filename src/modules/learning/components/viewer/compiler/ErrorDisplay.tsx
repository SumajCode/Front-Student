"use client";

import React from "react";

interface ErrorDisplayProps {
  error: string;
  mode: 'compilar' | 'evaluar';
}

export function ErrorDisplay({ error, mode: _mode }: ErrorDisplayProps) {
  const errorText = error || '';
  
  // Extraer mensaje del sistema si existe
  const lines = errorText.split('\n');
  let systemMessage = '';
  let actualError = errorText;
  
  // Detectar si hay un mensaje del sistema seguido de un error
  if (lines.length > 2 && (lines[0].includes('xd') || lines[0].includes('programar'))) {
    systemMessage = lines[0];
    actualError = lines.slice(2).join('\n');
  }
  
  // Analizar el tipo de error específico
  if (actualError.includes('SyntaxError')) {
    let specificError = '';
    let suggestions: string[] = [];
    
    if (actualError.includes("'(' was never closed")) {
      specificError = 'Paréntesis sin cerrar';
      suggestions = [
        'Verifica que cada paréntesis que abres "(" tenga su correspondiente cierre ")"',
        'Revisa línea por línea para encontrar el paréntesis faltante',
        'Los paréntesis deben estar balanceados en todas las funciones'
      ];
    } else if (actualError.includes("']' was never closed") || actualError.includes("'[' was never closed")) {
      specificError = 'Corchetes sin cerrar';
      suggestions = [
        'Verifica que cada corchete que abres "[" tenga su correspondiente cierre "]"',
        'Revisa las listas y accesos a elementos de array',
        'Los corchetes son necesarios para listas: [1, 2, 3]'
      ];
    } else if (actualError.includes("'\"' was never closed") || actualError.includes("'''' was never closed")) {
      specificError = 'Comillas sin cerrar';
      suggestions = [
        'Verifica que cada comilla que abres tenga su correspondiente cierre',
        'Usa comillas dobles: "texto" o comillas simples: \'texto\'',
        'Asegúrate de cerrar todas las cadenas de texto'
      ];
    } else if (actualError.includes('invalid syntax')) {
      specificError = 'Sintaxis incorrecta';
      suggestions = [
        'Revisa la sintaxis de Python en la línea señalada',
        'Verifica que uses los dos puntos ":" después de if, for, def, etc.',
        'Comprueba la indentación (espacios al inicio de las líneas)'
      ];
    } else if (actualError.includes('IndentationError')) {
      specificError = 'Error de indentación';
      suggestions = [
        'Python usa espacios para organizar el código',
        'Usa 4 espacios para cada nivel de indentación',
        'Todo el código dentro de una función debe estar indentado igual'
      ];
    } else {
      specificError = 'Error de sintaxis';
      suggestions = [
        'Revisa la sintaxis de Python en la línea indicada',
        'Verifica paréntesis, corchetes y comillas',
        'Asegúrate de usar la sintaxis correcta de Python'
      ];
    }
    
    return (
      <div className="space-y-3">
        {systemMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">💬</span>
              <span className="text-sm font-semibold text-blue-800">Mensaje del sistema:</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">{systemMessage}</p>
          </div>
        )}
        
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-yellow-800">{specificError}</p>
            <p className="text-xs text-yellow-700">Hay un problema con la estructura de tu código</p>
          </div>
        </div>
        
        <div className="bg-red-900 text-red-100 p-3 rounded-lg font-mono text-sm overflow-auto max-h-48">
          {actualError}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-semibold mb-2 flex items-center gap-2">
            <span>💡</span>
            ¿Cómo solucionarlo?
          </p>
          <ul className="text-sm text-blue-700 space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } else if (actualError.includes('NameError')) {
    let variableName = '';
    const nameMatch = actualError.match(/name '(\w+)' is not defined/);
    if (nameMatch) {
      variableName = nameMatch[1];
    }
    
    return (
      <div className="space-y-3">
        {systemMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">💬</span>
              <span className="text-sm font-semibold text-blue-800">Mensaje del sistema:</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">{systemMessage}</p>
          </div>
        )}
        
        <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <span className="text-orange-600 text-xl">🔍</span>
          <div>
            <p className="text-sm font-semibold text-orange-800">Variable No Definida</p>
            <p className="text-xs text-orange-700">
              {variableName ? `La variable "${variableName}" no existe` : 'Se está usando algo que no existe'}
            </p>
          </div>
        </div>
        
        <div className="bg-red-900 text-red-100 p-3 rounded-lg font-mono text-sm overflow-auto max-h-48">
          {actualError}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-semibold mb-2 flex items-center gap-2">
            <span>💡</span>
            ¿Cómo solucionarlo?
          </p>
          <ul className="text-sm text-blue-700 space-y-2">
            {variableName ? (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Define la variable <code className="bg-blue-100 px-1 rounded">{variableName}</code> antes de usarla</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Verifica que escribiste correctamente: <code className="bg-blue-100 px-1 rounded">{variableName}</code></span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Verifica que todas las variables estén definidas antes de usarlas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Revisa la ortografía de nombres de variables y funciones</span>
                </li>
              </>
            )}
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Asegúrate de importar las librerías necesarias</span>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    // Error genérico pero mejorado
    return (
      <div className="space-y-3">
        {systemMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">💬</span>
              <span className="text-sm font-semibold text-blue-800">Mensaje del sistema:</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">{systemMessage}</p>
          </div>
        )}
        
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600 text-xl">❌</span>
          <div>
            <p className="text-sm font-semibold text-red-800">Error en el código</p>
            <p className="text-xs text-red-700">Revisa el mensaje de error para más detalles</p>
          </div>
        </div>
        
        <div className="bg-red-900 text-red-100 p-3 rounded-lg font-mono text-sm overflow-auto max-h-48">
          {actualError}
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800 font-semibold mb-2 flex items-center gap-2">
            <span>💡</span>
            Consejos generales:
          </p>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Lee el mensaje de error cuidadosamente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Busca la línea donde ocurre el problema</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Revisa la sintaxis de Python paso a paso</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
