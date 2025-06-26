"use client";
import { useEffect } from "react";

export default function GuardarDatosUrlEnLocalStorage() {
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
  }, []);

  return null;
}
