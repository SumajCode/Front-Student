"use client";

import React from "react";
import { Button } from "@/ui/button";

interface CompilerHeaderProps {
  modo: 'compilar' | 'evaluar';
  setModo: (modo: 'compilar' | 'evaluar') => void;
  loading: boolean;
  onExecute: () => void;
  onClear: () => void;
}

export function CompilerHeader({ modo, setModo, loading, onExecute, onClear }: CompilerHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Lado izquierdo - Información y selector de modo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🐍</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Python Compiler</h2>
              <p className="text-xs text-gray-500">Ejecuta y evalúa código</p>
            </div>
          </div>
          
          <div className="flex bg-gray-50 rounded-lg p-1 shadow-inner">
            <button
              onClick={() => setModo('compilar')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 flex items-center gap-2 ${
                modo === 'compilar'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>⚡</span>
              Compilar
            </button>
            <button
              onClick={() => setModo('evaluar')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 flex items-center gap-2 ${
                modo === 'evaluar'
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>🧪</span>
              Evaluar
            </button>
          </div>
        </div>

        {/* Lado derecho - Botones de acción */}
        <div className="flex gap-2">
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
            className="flex items-center gap-1 px-3 py-2 border-gray-300 hover:bg-gray-50"
          >
            <span className="text-xs">🗑️</span>
            Limpiar
          </Button>
          <Button
            onClick={onExecute}
            disabled={loading}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
                Ejecutando...
              </>
            ) : (
              <>
                <span className="text-xs">{modo === 'compilar' ? '⚡' : '🧪'}</span>
                {modo === 'compilar' ? 'Compilar' : 'Evaluar'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
