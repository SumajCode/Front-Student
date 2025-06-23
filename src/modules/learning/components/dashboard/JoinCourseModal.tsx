"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { toast } from "sonner";

interface JoinCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
  courseTitle: string;
  onJoinSuccess: () => void;
}

export function JoinCourseModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  onJoinSuccess,
}: JoinCourseModalProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí irá la llamada a la API para verificar el código y unirse al curso
      await fetch('/api/cursos/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId, code }),
      });
      
      toast.success("¡Te has unido al curso correctamente!");
      onJoinSuccess();
      onClose();
    } catch (err) {
      console.error('Error al unirse al curso:', err);
      toast.error("El código ingresado no es válido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unirse al Curso</DialogTitle>
          <DialogDescription>
            Ingresa el código de acceso para unirte a <span className="font-medium">{courseTitle}</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Ingresa el código del curso"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
            required
          />
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Uniendo..." : "Unirse al Curso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
