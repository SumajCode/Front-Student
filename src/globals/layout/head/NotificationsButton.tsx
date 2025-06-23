"use client";

import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/popover";

export function NotificationsButton() {
  return (
  <Popover>
      <PopoverTrigger asChild>
        <div className="text-gray-600 hover:text-purple-600 relative cursor-pointer">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <p className="text-sm text-gray-600">No hay notificaciones nuevas</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
