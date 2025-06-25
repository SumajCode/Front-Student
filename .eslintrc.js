module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "eslint:recommended"
  ],
  plugins: [
    "react"
  ],
  rules: {
    // Deshabilitado para Next.js 13+ que no requiere import React
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    // Permitir variables no usadas que comienzan con _
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    // Desactivar prop-types ya que usamos TypeScript
    "react/prop-types": "off",
    // Permitir any implícito en algunos casos
    "@typescript-eslint/no-explicit-any": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  // Configuración específica para TypeScript
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "no-undef": "off" // TypeScript maneja esto
      }
    }
  ]
}
