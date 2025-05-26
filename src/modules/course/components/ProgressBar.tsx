"use client";
import React from "react";


export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-600">{progress}%</span>
    </div>
  );
}
