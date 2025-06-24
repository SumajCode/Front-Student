"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";

interface CourseOverviewProps {
  title: string;
  description: string;
}

export function CourseOverview({ title, description }: CourseOverviewProps) {
  return (
    <div className="space-y-4 max-w-4xl mx-auto px-8 py-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
