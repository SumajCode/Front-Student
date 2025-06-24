'use client';

import React from 'react';
import Login from '@/modules/auth/components/login';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Iniciar Sesión</h1>
          <p className="text-gray-600">Accede a tu cuenta de estudiante</p>
        </div>
        <Login />
      </div>
    </div>
  );
}
