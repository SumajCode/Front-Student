"use client";

import React from "react";
import { LogOut, User } from "lucide-react";
import { Button } from "@/ui/button";
import type { LoginData } from "@/lib/types";

interface AuthButtonsProps {
  loginData: LoginData;
  onLogout: () => void;
}

export default function AuthButtons({ loginData, onLogout }: AuthButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span className="text-sm font-medium">
          {loginData.nombres} {loginData.apellidos}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onLogout}
        className="h-8 w-8"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
