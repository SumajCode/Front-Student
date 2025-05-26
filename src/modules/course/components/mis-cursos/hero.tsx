"use client";
import { useState } from "react";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"video" | "compiler">("video");
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 ${
            activeTab === "video"
              ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white border-b-2 border-purple-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("video")}
        >
          Video
        </button>
        <button
          className={`flex-1 px-6 py-3 text-sm font-medium transition-all duration-200 ${
            activeTab === "compiler"
              ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white border-b-2 border-purple-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("compiler")}
        >
          Compilador
        </button>
      </div>
      {/* Content */}
      <div className="aspect-video relative">
        {activeTab === "video" ? (
          <div className="absolute inset-0 bg-black">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-900 text-gray-200 font-mono p-4">
            <div className="flex items-center mb-2 space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="h-full overflow-auto">
              <pre className="text-sm">
                <code>{`// Tu código aquí`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
