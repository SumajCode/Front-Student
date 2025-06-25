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
    <div className="h-full flex flex-col bg-gray-50">
      <CompilerHeader 
        modo={modo}
        setModo={setModo}
        loading={loading}
        onExecute={ejecutarCodigo}
        onClear={limpiarEditor}
      />

      {modo === 'evaluar' && (
        <EvaluationForm
          functionName={functionName}
          setFunctionName={setFunctionName}
          inputs={inputs}
          setInputs={setInputs}
          outputs={outputs}
          setOutputs={setOutputs}
        />
      )}

      <div className="flex-1 flex gap-4 p-4">
        <div className={`${modo === 'evaluar' ? 'flex-none w-1/2' : 'flex-1'} flex flex-col`}>
          <CodeEditor 
            codigo={codigo}
            setCodigo={setCodigo}
            modo={modo}
          />
        </div>

        <div className={`${modo === 'evaluar' ? 'flex-1' : 'w-96'} flex flex-col`}>
          <ResultsPanel 
            modo={modo}
            loading={loading}
            resultado={resultado}
            functionName={functionName}
          />
        </div>
      </div>
    </div>
  );
}