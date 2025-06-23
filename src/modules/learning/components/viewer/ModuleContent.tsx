"use client";
import React from "react";
import { Card, CardContent } from "@/ui/card";
import VideoPlayer from "./VideoPlayer";
import { NavigationButton } from "./NavigationButton";

interface ModuleContentProps {
  module: {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
  };
}

export default function ModuleContent({ module }: ModuleContentProps) {
  if (!module) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {module.videoUrl && (
        <div className="mb-8">
          <VideoPlayer videoUrl={module.videoUrl} title={module.title} />
        </div>
      )}
      <div className="prose max-w-none">
        <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
        <div className="text-gray-600">{module.description}</div>
      </div>
      <div className="flex justify-between items-center pt-8">
        <NavigationButton direction="previous" />
        <NavigationButton direction="next" />
      </div>
    </div>
  );
}
