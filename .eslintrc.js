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
    "react/react-in-jsx-scope": "error",
    "react/jsx-uses-react": "error"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
