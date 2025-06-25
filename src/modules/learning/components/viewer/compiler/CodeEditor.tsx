"use client";

import React from "react";

interface CodeEditorProps {
  codigo: string;
  setCodigo: (value: string) => void;
  modo: 'compilar' | 'evaluar';
}

export function CodeEditor({ codigo, setCodigo, modo }: CodeEditorProps) {
  const _codigo = codigo;
  const _setCodigo = setCodigo;
  return (
    <div className={`bg-white rounded-xl border shadow-lg ${modo === 'evaluar' ? 'h-80' : 'flex-1'} flex flex-col overflow-hidden`}>
      <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-sm font-medium">main.py</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-300">
            <span className="px-2 py-1 bg-blue-600 rounded">Python 3.9</span>
            <span>🐍</span>
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <textarea
          value={_codigo}
          onChange={(e) => _setCodigo(e.target.value)}
          className="w-full h-full p-6 font-mono text-sm border-0 resize-none focus:outline-none focus:ring-0 bg-gray-50"
          placeholder={modo === 'compilar' 
            ? '# Escribe tu código Python aquí\nprint("¡Hola, mundo!")\n\n# Ejemplo:\n# nombre = "SumajCode"\n# print(f"Bienvenido a {nombre}")'
            : '# Define tu función aquí\ndef suma(a, b=3):\n    """Suma dos números"""\n    return a + b\n\n# La función será evaluada automáticamente'
          }
          style={{ 
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            lineHeight: '1.5'
          }}
        />
        {/* Líneas de numeración simuladas */}
        <div className="absolute left-2 top-6 text-xs text-gray-400 pointer-events-none select-none">
          {_codigo.split('\n').map((_, index) => (
            <div key={index} style={{ lineHeight: '1.5em', height: '21px' }}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
