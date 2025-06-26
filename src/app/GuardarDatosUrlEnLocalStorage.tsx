"use client";
import { useEffect } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export default function GuardarDatosUrlEnLocalStorage() {
  const { loginWithExternalToken } = useAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      const idEstudiante = params.get("id_estudiante");
      const correoEstudiante = params.get("correo_estudiante");
      const nombreEstudiante = params.get("nombre_estudiante");
      const authSource = params.get("auth_source");
      const timestamp = params.get("timestamp");

      if (idEstudiante) localStorage.setItem("id_estudiante", idEstudiante);
      if (correoEstudiante) localStorage.setItem("correo_estudiante", correoEstudiante);
      if (nombreEstudiante) localStorage.setItem("nombre_estudiante", nombreEstudiante);
      if (authSource) localStorage.setItem("auth_source", authSource);
      if (timestamp) localStorage.setItem("timestamp", timestamp);

      // Login automático si hay datos mínimos
      if (idEstudiante && correoEstudiante && nombreEstudiante) {
        const userData = {
          id: idEstudiante,
          id_estudiante: idEstudiante,
          nombre: nombreEstudiante,
          nombre_estudiante: nombreEstudiante,
          correo: correoEstudiante,
          correo_estudiante: correoEstudiante,
        };
        loginWithExternalToken("token_externo_temporal", userData);
      }

      // Limpiar la URL (sin recargar la página)
      if (
        idEstudiante ||
        correoEstudiante ||
        nombreEstudiante ||
        authSource ||
        timestamp
      ) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  }, [loginWithExternalToken]);

  return null;
}
