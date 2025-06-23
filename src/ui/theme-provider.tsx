'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * Proveedor de temas para la aplicación usando next-themes.
 * Para usar, envuelve tu aplicación con este componente, típicamente en layout.tsx
 * 
 * Ejemplo de uso:
 * ```tsx
 * // En src/app/layout.tsx:
 * import { ThemeProvider } from "@/components/ui/theme-provider"
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="es" suppressHydrationWarning>
 *       <body>
 *         <ThemeProvider
 *           attribute="class"
 *           defaultTheme="system"
 *           enableSystem
 *         >
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
