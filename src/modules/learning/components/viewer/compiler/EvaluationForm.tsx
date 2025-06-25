"use client";

import React from "react";

interface EvaluationFormProps {
  functionName: string;
  setFunctionName: (value: string) => void;
  inputs: string;
  setInputs: (value: string) => void;
  outputs: string;
  setOutputs: (value: string) => void;
}

export function EvaluationForm({
  functionName,
  setFunctionName,
  inputs,
  setInputs,
  outputs,
  setOutputs
}: EvaluationFormProps) {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-purple-600 text-xs">⚙️</span>
        </div>
        <h4 className="text-sm font-semibold text-gray-800">Casos de Prueba</h4>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm border">
          <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-1">
            <span className="w-4 h-4 bg-indigo-100 rounded-full flex items-center justify-center text-xs">🔧</span>
            Función
          </label>
          <input
            type="text"
            value={functionName}
            onChange={(e) => setFunctionName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="suma"
          />
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-sm border">
          <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-1">
            <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-xs">📥</span>
            Entradas
          </label>
          <input
            type="text"
            value={inputs}
            onChange={(e) => setInputs(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="2, 1, 5"
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Casos: {inputs ? inputs.split(',').length : 0}</span>
            <span className="px-1 py-0.5 bg-green-100 text-green-700 text-xs rounded">In</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-3 shadow-sm border">
          <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 mb-1">
            <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center text-xs">📤</span>
            Esperados
          </label>
          <input
            type="text"
            value={outputs}
            onChange={(e) => setOutputs(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="5, 4, 8"
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Casos: {outputs ? outputs.split(',').length : 0}</span>
            <span className="px-1 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">Out</span>
          </div>
        </div>
      </div>
      
      {/* Resumen compacto */}
      {inputs && outputs && (
        <div className="mt-3 p-2 bg-white rounded-md border text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>🧪</span>
              <span className="text-gray-600">{inputs.split(',').length} → {outputs.split(',').length}</span>
            </div>
            {inputs.split(',').length === outputs.split(',').length ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                ✅ Balanceado
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                ⚠️ Desbalanceado
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
