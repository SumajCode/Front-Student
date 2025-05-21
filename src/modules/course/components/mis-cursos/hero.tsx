"use client";
import { useState } from "react";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"video" | "compiler">("video");
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-t ${
            activeTab === "video"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("video")}
        >
          Video
        </button>
        <button
          className={`px-4 py-2 rounded-t ${
            activeTab === "compiler"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("compiler")}
        >
          Compilador
        </button>
      </div>
      {/* Content */}
      <div className="border-t p-4">
        {activeTab === "video" ? (
          <div className="w-full h-64 bg-black flex items-center justify-center text-white">
            Aquí va el video
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-700">
            Aquí va el compilador
          </div>
        )}
      </div>
    </div>
  );
}
