'use client';

import { useState } from 'react';
import { Button } from '@/ui/button';

const API_BASE = 'https://microservice-estudiante.onrender.com';

export default function TestConexion() {
  const [resultados, setResultados] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState<{[key: string]: boolean}>({});

  const probarConexionDirecta = async () => {
    setLoading(prev => ({ ...prev, conexionDirecta: true }));
    try {
      const response = await fetch(`${API_BASE}/estudiantes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setResultados(prev => ({
        ...prev,
        conexionDirecta: `Status: ${response.status}, Mensaje: ${JSON.stringify(data)}`
      }));
    } catch (error) {
      setResultados(prev => ({
        ...prev,
        conexionDirecta: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`
      }));
    } finally {
      setLoading(prev => ({ ...prev, conexionDirecta: false }));
    }
  };

  const probarLogin = async () => {
    setLoading(prev => ({ ...prev, login: true }));
    try {
      const response = await fetch(`${API_BASE}/estudiantes/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          correo_estudiante: 'mateo@gmail.com',
          contrasenia: 'hola123'
        })
      });
      const data = await response.json();
      setResultados(prev => ({
        ...prev,
        login: `Status: ${response.status}, Mensaje: ${JSON.stringify(data)}`
      }));
    } catch (error) {
      setResultados(prev => ({
        ...prev,
        login: `Error: ${error instanceof Error ? error.message : 'Error desconocido'}`
      }));
    } finally {
      setLoading(prev => ({ ...prev, login: false }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test de Conexión con Backend</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Conexión Directa al Backend</h2>
          <Button 
            onClick={probarConexionDirecta}
            disabled={loading.conexionDirecta}
          >
            {loading.conexionDirecta ? 'Probando...' : 'Probar Conexión'}
          </Button>
          {resultados.conexionDirecta && (
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              {resultados.conexionDirecta}
            </pre>
          )}
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Login Test</h2>
          <Button 
            onClick={probarLogin}
            disabled={loading.login}
          >
            {loading.login ? 'Probando...' : 'Probar Login'}
          </Button>
          {resultados.login && (
            <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
              {resultados.login}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
