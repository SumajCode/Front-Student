"use client";
import React from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/ui/button";
import { useLocalStorage } from "@/globals/hooks/useLocalStorage";
import Navigation from "./components/Navigation";
import AuthButtons from "./components/AuthButtons";
import MobileMenu from "./components/MobileMenu";

// Interfaces
interface LoginData {
  token: string;
  nombres: string;
  apellidos: string;
  correo: string;
}

interface FormData {
  nombres: string;
  apellidos: string;
  correo: string;
  contrasenia: string;
  confirmarContrasenia?: string;
}

export default function Head() {
  const router = useRouter();
  const pathname = usePathname();

  // Estados
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nombres: "",
    apellidos: "",
    correo: "",
    contrasenia: "",
    confirmarContrasenia: "",
  });
  
  const [loginData, setLoginData] = useLocalStorage<LoginData | null>("loginData", null);

  // Función para validar email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setLoginData(null);
    router.push("/");
  };

  // Función para manejar el registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validar contraseñas y email
      if (formData.contrasenia !== formData.confirmarContrasenia) {
        throw new Error("Las contraseñas no coinciden");
      }
      
      if (!isValidEmail(formData.correo)) {
        throw new Error("El correo electrónico no es válido");
      }

      const registerData = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        contrasenia: formData.contrasenia,
      };

      const response = await fetch("/api/estudiantes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al registrar");
      }

      setRegistroExitoso(true);
      setIsLogin(true);
      setFormData({
        nombres: "",
        apellidos: "",
        correo: "",
        contrasenia: "",
        confirmarContrasenia: "",
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.correo || !formData.contrasenia) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: formData.correo,
          contrasenia: formData.contrasenia,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al iniciar sesión");
      }

      const data = await response.json();
      setLoginData(data);
      setFormData({
        nombres: "",
        apellidos: "",
        correo: "",
        contrasenia: "",
        confirmarContrasenia: "",
      });
      setOpen(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Verificar si estamos en una ruta de aprendizaje
  const isLearningPath = pathname?.startsWith('/learning');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/file.svg" width={28} height={28} alt="Logo" />
          <span className="font-bold text-purple-700 text-xl">SumajCode</span>
        </Link>

        {/* Navegación centrada */}
        <div className="flex-1 flex justify-center">
          <Navigation loginData={loginData} isLearningPath={isLearningPath} />
        </div>

        {/* Botones de autenticación a la derecha */}
        <div className="flex items-center gap-2">
          {loginData ? (
            <AuthButtons 
              loginData={loginData} 
              onLogout={handleLogout}
            />
          ) : (
            <Button
              onClick={() => setOpen(true)}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              Iniciar sesión
            </Button>
          )}
        </div>
      </div>
      {/* Menú móvil */}
      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  );
}
