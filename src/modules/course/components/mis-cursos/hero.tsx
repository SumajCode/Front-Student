"use client";
import { useState } from "react";

// URL del compilador
const COMPILER_URL = process.env.NEXT_PUBLIC_COMPILER_API_URL || "https://microservicecompilador.onrender.com/apicompilador/v1/code/compilar";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"video" | "compiler">("video");
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("python");
  const [compilerResult, setCompilerResult] = useState<{
    result?: string;
    memoriaUso?: number;
    tiempoEjecucion?: number;
    status?: string;
    message?: string;
  } | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCompile = async () => {
    try {
      setIsCompiling(true);
      
      // Preparar los datos para enviar
      const payload = {
        code: code,
        lang: 'python'
      };

      console.log("=== Información de la petición ===");
      console.log("URL:", COMPILER_URL);
      console.log("Método:", "POST");
      console.log("Payload:", payload);
        const response = await fetch(COMPILER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      console.log("=== Información de la respuesta ===");
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);
      console.log("Headers:", Object.fromEntries(response.headers));

      // Si la respuesta no es exitosa, mostrar el error
      if (!response.ok) {
        const errorText = await response.text();
        console.error("=== Error del servidor ===");
        console.error("Status:", response.status);
        console.error("Status Text:", response.statusText);
        console.error("Respuesta:", errorText);
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("=== Respuesta del servidor ===");
      console.log("Status:", response.status);
      console.log("Data:", data);

      if (!response.ok) {
        throw new Error(data.message || 'Error en la compilación');
      }

      setCompilerResult({
        result: data.data?.result || "",
        memoriaUso: data.data?.memoriaUso || 0,
        tiempoEjecucion: data.data?.tiempoEjecucion || 0,
        status: "OK",
        message: data.message || "Compilación exitosa"
      });
    } catch (error: unknown) {
      console.error("Error en la compilación:", error);
      setCompilerResult({
        result: "",
        memoriaUso: 0,
        tiempoEjecucion: 0,
        status: "ERROR",
        message: error instanceof Error ? error.message : "Error al intentar compilar el código"
      });
    } finally {
      setIsCompiling(false);
    }
  };

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
        ) : (          <div className="absolute inset-0 bg-gray-900 text-gray-200 font-mono p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center space-x-2">                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-700"
                  disabled
                >
                  <option value="python">Python</option>
                </select>
                <button
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className={`px-4 py-1 rounded text-sm ${
                    isCompiling
                      ? "bg-gray-700 text-gray-400"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {isCompiling ? "Compilando..." : "Compilar"}
                </button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="h-full">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-gray-800 p-4 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-purple-600 rounded"
                  placeholder="// Escribe tu código aquí"
                />
              </div>
              <div className="h-full bg-gray-800 p-4 rounded">
                {compilerResult ? (
                  <div className="space-y-2">
                    <div className={`text-sm ${
                      compilerResult.status === "Error" ? "text-red-400" : "text-green-400"
                    }`}>
                      {compilerResult.status === "Error" ? "❌ Error" : "✅ ¡Correcto!"}
                    </div>
                    {compilerResult.message && (
                      <div className="text-sm text-yellow-400 mb-2">
                        {compilerResult.message}
                      </div>
                    )}
                    <pre className="text-sm whitespace-pre-wrap">
                      {compilerResult.result || "Sin resultado"}
                    </pre>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">
                    El resultado de la compilación aparecerá aquí
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              {compilerResult && (
                <div className={`p-4 rounded-lg ${
                  compilerResult.status === "Error" 
                    ? "bg-red-100 border border-red-400 text-red-700" 
                    : "bg-green-100 border border-green-400 text-green-700"
                }`}>
                  <h3 className="font-bold mb-2">
                    {compilerResult.status === "Error" ? "Error:" : "¡Felicitaciones!"}
                  </h3>
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {compilerResult.result}
                  </pre>
                </div>
              )}
              {isCompiling && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                  <p className="mt-2 text-gray-600">Compilando...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
