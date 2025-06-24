"use client";

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { NotificationsButton } from "./NotificationsButton";
import { usePathname } from 'next/navigation';

interface NavigationProps {
  isLearningPath: boolean;
  isAuthenticated: boolean;
}

export function Navigation({ isLearningPath, isAuthenticated }: NavigationProps) {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center space-x-8">      <Link
        href="/explore"
        className={`text-gray-600 hover:text-purple-600 ${
          pathname === '/explore' ? 'text-purple-600 font-medium' : ''
        }`}
      >
        Explore
      </Link>
      <Link
        href="/learning/dashboard"
        className={`text-gray-600 hover:text-purple-600 ${
          isLearningPath ? 'text-purple-600 font-medium' : ''
        }`}
      >
        My Learning
      </Link>
      
      {/* Search Button */}
      <button className="text-gray-600 hover:text-purple-600">
        <Search size={20} />
      </button>

      {/* Notifications */}
      {isAuthenticated && <NotificationsButton />}
    </nav>
  );
}
