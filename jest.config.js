const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom', // Necesario si estás testeando React
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Usa babel-jest para compilar el código
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Soporte para alias "@/*" como en tu tsconfig.json
  },
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)'], // Asegura que Jest busque bien los tests
};

