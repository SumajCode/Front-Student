"use client";

export function useCourseData() {
  const sections = [
    {
      title: "Introducción al curso",
      completed: 2,
      total: 3,
      duration: 25,
      lessons: [
        {
          id: 1,
          completed: true,
          type: "video",
          number: 1,
          title: "Bienvenida al curso",
          duration: 5,
          hasResources: true,
          resources: [
            {
              title: "Guía de inicio",
              type: "download",
              url: "/resources/guia-inicio.pdf"
            },
            {
              title: "Comunidad Discord",
              type: "link",
              url: "https://discord.gg/sumajcode"
            }
          ]
        },
        {
          id: 2,
          completed: true,
          type: "video",
          number: 2,
          title: "Configuración del entorno",
          duration: 10,
          hasResources: true,
          resources: [
            {
              title: "Código de configuración",
              type: "code",
              url: "https://github.com/sumajcode/setup"
            },
            {
              title: "Lista de herramientas",
              type: "download",
              url: "/resources/herramientas.pdf"
            }
          ]
        },
        {
          id: 3,
          completed: false,
          type: "video",
          number: 3,
          title: "Overview del curso",
          duration: 10,
          hasResources: true,
          resources: [
            {
              title: "Mapa de contenido",
              type: "download",
              url: "/resources/mapa-contenido.pdf"
            }
          ]
        }
      ]
    },
    {
      title: "Fundamentos de React",
      completed: 0,
      total: 4,
      duration: 45,
      lessons: [
        {
          id: 4,
          completed: false,
          type: "video",
          number: 1,
          title: "¿Qué es React?",
          duration: 12,
          hasResources: true,
          resources: [
            {
              title: "Presentación",
              type: "download",
              url: "/resources/react-intro.pdf"
            },
            {
              title: "Documentación oficial",
              type: "link",
              url: "https://react.dev"
            }
          ]
        },
        {
          id: 5,
          completed: false,
          type: "video",
          number: 2,
          title: "Componentes y Props",
          duration: 15,
          hasResources: true,
          resources: [
            {
              title: "Ejercicios prácticos",
              type: "code",
              url: "https://github.com/sumajcode/react-exercises"
            }
          ]
        },
        {
          id: 6,
          completed: false,
          type: "video",
          number: 3,
          title: "Estado y ciclo de vida",
          duration: 18,
          hasResources: true,
          resources: [
            {
              title: "Ejemplos de código",
              type: "code",
              url: "https://github.com/sumajcode/react-state-examples"
            },
            {
              title: "Diagrama del ciclo de vida",
              type: "download",
              url: "/resources/lifecycle.pdf"
            }
          ]
        }
      ]
    }
  ];

  return { sections };
}
