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
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"></div>
      
      <div className="relative flex flex-wrap items-center justify-between gap-6">
        {/* Lado izquierdo - Información y selector de modo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.83l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.23l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21V3.23l.03-.21.07-.28.12-.32.18-.35.26-.36.36-.36.46-.35.59-.32.73-.28.88-.21 1.05-.14 1.23-.05z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Python Compiler
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Online</span>
              </h2>
              <p className="text-gray-300 text-sm mt-1">Ejecuta y evalúa código Python en tiempo real</p>
            </div>
          </div>
          
          <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-xl p-1.5 shadow-lg border border-gray-700">
            <button
              onClick={() => setModo('compilar')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 relative overflow-hidden ${
                modo === 'compilar'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {modo === 'compilar' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse"></div>
              )}
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="relative z-10">Compilar</span>
            </button>
            <button
              onClick={() => setModo('evaluar')}
              className={`px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center gap-3 relative overflow-hidden ${
                modo === 'evaluar'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {modo === 'evaluar' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse"></div>
              )}
              <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="relative z-10">Evaluar</span>
            </button>
          </div>
        </div>

        {/* Lado derecho - Botones de acción */}
        <div className="flex gap-3">
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-500 transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpiar
          </Button>
          <Button
            onClick={onExecute}
            disabled={loading}
            size="sm"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Ejecutando...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{modo === 'compilar' ? 'Ejecutar' : 'Evaluar'}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
