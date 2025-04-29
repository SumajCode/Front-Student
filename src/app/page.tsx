import React from 'react';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '3rem', color: '#0070f3' }}>¡Bienvenido a mi proyecto Next.js!</h1>
      <p style={{ fontSize: '1.5rem', color: '#333' }}>Este es un ejemplo básico de una página inicial.</p>
    </div>
  );
}
