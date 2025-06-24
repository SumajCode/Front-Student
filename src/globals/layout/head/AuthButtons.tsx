"use client";

import { Button } from "@/ui/button";
import { useRouter } from 'next/navigation';

interface AuthButtonsProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function AuthButtons({ isAuthenticated, onLogin, onLogout }: AuthButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-4">
      {!isAuthenticated ? (
        <Button
          variant="default"
          size="sm"
          className="bg-purple-600 text-white hover:bg-purple-700"
          onClick={onLogin}
        >
          Login
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onLogout();
            router.push('/');
          }}
        >
          Cerrar Sesión
        </Button>
      )}
    </div>
  );
}
