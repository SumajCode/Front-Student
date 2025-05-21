"use client";
import { useCourseNavigation } from "../hooks/useCourseNavigation";

export default function SidebarModuleList() {
  const { modules, currentModuleId, navigateToModule } = useCourseNavigation();

  return (
    <ul className="space-y-1">
      {modules.map((mod) => {
        const isActive = mod.id === currentModuleId;
        return (
          <li
            key={mod.id}
            onClick={() => navigateToModule(mod.id)}
            className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "hover:bg-gray-100 text-gray-700 hover:text-blue-700"
            }`}
          >
            <div
              className={`mr-3 h-2 w-2 rounded-full ${
                isActive ? "bg-blue-700" : "bg-blue-600 group-hover:bg-blue-700"
              }`}
            />
            <span className="text-sm font-medium">{mod.title}</span>
          </li>
        );
      })}
    </ul>
  );
}
