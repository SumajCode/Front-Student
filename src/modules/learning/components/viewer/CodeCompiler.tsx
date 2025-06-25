"use client";

import React, { useState } from "react";
import { compiladorDirectoService } from "@/lib/gateway-service";
import { CompilerHeader } from "./compiler/CompilerHeader";
import { EvaluationForm } from "./compiler/EvaluationForm";
import { CodeEditor } from "./compiler/CodeEditor";
import { ResultsPanel } from "./compiler/ResultsPanel";

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
  
  // Estados para evaluación
  const [functionName, setFunctionName] = useState('');
  const [inputs, setInputs] = useState('');
  const [outputs, setOutputs] = useState('');

  const ejecutarCodigo = async () => {
    if (!codigo.trim()) {
      setResultado({
        status: 'error',
        error: 'Por favor, escriba algo de código antes de ejecutar.'
      });
      return;
    }

    // Validación para modo evaluar
    if (modo === 'evaluar') {
      if (!functionName.trim()) {
        setResultado({
          status: 'error',
          error: 'Por favor, ingrese el nombre de la función a evaluar.'
        });
        return;
      }
      
      const inputArray = inputs ? inputs.split(',').map(i => i.trim()) : [];
      const outputArray = outputs ? outputs.split(',').map(o => o.trim()) : [];
      
      if (inputArray.length !== outputArray.length) {
        setResultado({
          status: 'error',
          error: `Los inputs (${inputArray.length}) y outputs (${outputArray.length}) deben tener el mismo tamaño.`
        });
        return;
      }
      
      if (inputArray.length === 0) {
        setResultado({
          status: 'error',
          error: 'Por favor, ingrese al menos un caso de prueba (inputs y outputs).'
        });
        return;
      }
    }

    setLoading(true);
    setResultado({ status: 'running' });

    try {
      const payload = modo === 'compilar' 
        ? {
            codigo: codigo,
            lenguaje: 'python'
          }
        : {
            codigo: codigo,
            lenguaje: 'python',
            outputs: outputs.split(',').map(o => {
              const trimmed = o.trim();
              const num = Number(trimmed);
              return isNaN(num) ? trimmed : num;
            }),
            inputs: inputs.split(',').map(i => {
              const trimmed = i.trim();
              const num = Number(trimmed);
              return isNaN(num) ? trimmed : num;
            }),
            functionInvoke: functionName.trim(),
            rules: {
              functions: {
                functionNames: [functionName.trim()]
              }
            }
          };
      
      console.log(`${modo === 'compilar' ? 'Compilando' : 'Evaluando'} código con payload:`, payload);
      
      const response = modo === 'compilar' 
        ? await compiladorDirectoService.compilar(payload)
        : await compiladorDirectoService.evaluar(payload);
      
      console.log('Respuesta del compilador:', response);

      if (response.success) {
        const data = response.data as any;
        
        let output = '';
        let message = '';
        
        if (data.message) {
          message = data.message;
        }
        
        if (data.data) {
          if (data.data.result) {
            output = data.data.result;
          } else if (data.data.output) {
            output = data.data.output;
          } else {
            output = JSON.stringify(data.data, null, 2);
          }
        } else if (data.result) {
          output = data.result;
        } else if (data.output) {
          output = data.output;
        } else {
          output = JSON.stringify(data, null, 2);
        }
        
        const finalOutput = message && output ? `${message}\n\n${output}` : (output || message || 'Ejecutado correctamente');
        
        setResultado({
          status: 'success',
          output: finalOutput,
          exitCode: data.code || data.exitCode || data.exit_code || 0
        });
      } else {
        const errorData = response.data as any;
        let errorMessage = '';
        
        if (errorData.message && errorData.data?.result) {
          errorMessage = `${errorData.message}\n\n${errorData.data.result}`;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.data?.result) {
          errorMessage = errorData.data.result;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else {
          errorMessage = JSON.stringify(errorData) || 'Error desconocido durante la compilación';
        }
        
        setResultado({
          status: 'error',
          error: errorMessage
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
    setFunctionName('');
    setInputs('');
    setOutputs('');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Header mejorado */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <CompilerHeader 
          modo={modo}
          setModo={setModo}
          loading={loading}
          onExecute={ejecutarCodigo}
          onClear={limpiarEditor}
        />
      </div>

      {/* Formulario de evaluación con animación */}
      {modo === 'evaluar' && (
        <div className="bg-white border-b border-gray-200 transform transition-all duration-300 ease-in-out">
          <EvaluationForm
            functionName={functionName}
            setFunctionName={setFunctionName}
            inputs={inputs}
            setInputs={setInputs}
            outputs={outputs}
            setOutputs={setOutputs}
          />
        </div>
      )}

      {/* Área principal del código con diseño mejorado */}
      <div className="flex-1 flex gap-6 p-6 min-h-0">
        {/* Panel del editor */}
        <div className={`${modo === 'evaluar' ? 'flex-none w-1/2' : 'flex-1'} flex flex-col`}>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm font-mono">main.py</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-gray-400">Python</span>
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <CodeEditor 
                codigo={codigo}
                setCodigo={setCodigo}
                modo={modo}
              />
            </div>
          </div>
        </div>

        {/* Panel de resultados */}
        <div className={`${modo === 'evaluar' ? 'flex-1' : 'w-96'} flex flex-col`}>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-4 py-3 flex items-center gap-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-white font-medium">
                {modo === 'compilar' ? 'Salida del programa' : 'Resultados de evaluación'}
              </span>
              {loading && (
                <div className="ml-auto">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <ResultsPanel 
                modo={modo}
                loading={loading}
                resultado={resultado}
                functionName={functionName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}