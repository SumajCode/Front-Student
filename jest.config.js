const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest', {
      // Opciones de configuración de SWC si son necesarias
      // Por ejemplo, para asegurar la compatibilidad con React:
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true, // si usas decoradores
        },
        transform: {
          react: {
            runtime: 'automatic', // o 'classic'
          },
        },
      },
    }],
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)'],
};