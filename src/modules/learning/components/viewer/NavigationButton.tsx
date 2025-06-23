"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCourseNavigation } from "../../hooks/useCourseNavigation";

interface NavigationButtonProps {
  direction: "previous" | "next";
}

export function NavigationButton({ direction }: NavigationButtonProps) {
  const router = useRouter();
  const { currentModuleId } = useCourseNavigation();
    const handleNavigation = () => {
    const targetModuleId = direction === "next" 
      ? currentModuleId + 1 
      : currentModuleId - 1;
    router.push(`/learning/viewer/${targetModuleId}`);
  };

  const isDisabled = direction === "previous" 
    ? currentModuleId === 1 
    : currentModuleId === 4;

  return (
    <button
      onClick={handleNavigation}
      disabled={isDisabled}
      className={`
        px-4 py-2 rounded transition-colors
        ${isDisabled 
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
        }
      `}
    >
      {direction === "previous" ? "← Previous Module" : "Next Module →"}
    </button>
  );
}
