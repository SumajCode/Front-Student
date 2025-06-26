"use client";
import React, { useEffect, useState } from "react";
import { CourseDashboard } from "@/modules/learning/components/dashboard/CourseDashboard";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { docenteService } from "@/lib/gateway-service";

export default function DashboardPage() {
  const { user } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id_estudiante) {
      docenteService
        .getCursosEstudiante(user.id_estudiante)
        .then((data) => {
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-16 mt-16">
      <CourseDashboard />
    </div>
  );
}
