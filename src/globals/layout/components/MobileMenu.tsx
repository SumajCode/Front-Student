"use client";
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/ui/button";
import type { LoginData, FormData } from "@/lib/types";

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isLogin?: boolean;
  setIsLogin?: (value: boolean) => void;
  error?: string;
  loading?: boolean;
  loginData?: LoginData | null;
  registroExitoso?: boolean;
  formData?: FormData;
  handleLogin?: (e: React.FormEvent) => void;
  handleRegister?: (e: React.FormEvent) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
}

export default function MobileMenu({
  open,
  setOpen,
  isLogin = true,
  setIsLogin = () => {},
  error = "",
  loading = false,
  registroExitoso = false,
  formData = {
    nombres: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
  },
  handleLogin = (_e) => {
    _e.preventDefault();
  },
  handleRegister = (_e) => {
    _e.preventDefault();
  },
  handleInputChange = (_e) => {},
  onClose = () => setOpen(false),
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-sm border-l bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isLogin ? "Iniciar sesión" : "Registro"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4">
          {error && (
            <div className="mb-4 text-sm text-red-500">{error}</div>
          )}

          {registroExitoso && (
            <div className="mb-4 text-sm text-green-500">
              ¡Registro exitoso! Ya puedes iniciar sesión.
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="nombres"
                  placeholder="Nombres"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
              </>
            )}
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleInputChange}
              className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
              required
            />
            <input
              type="password"
              name="contrasenia"
              placeholder="Contraseña"
              value={formData.contrasenia}
              onChange={handleInputChange}
              className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
              required
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmarContrasenia"
                placeholder="Confirmar contraseña"
                value={formData.confirmarContrasenia}
                onChange={handleInputChange}
                className="mb-3 w-full rounded-lg border px-3 py-2 text-sm"
                required
              />
            )}
            <Button
              type="submit"
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? (
                "Cargando..."
              ) : isLogin ? (
                "Iniciar sesión"
              ) : (
                "Registrarse"
              )}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-600 hover:underline"
            >
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
