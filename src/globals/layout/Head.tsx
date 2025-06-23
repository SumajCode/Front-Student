"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { Navigation } from "./head/Navigation";
import { AuthButtons } from "./head/AuthButtons";
import { MobileMenu } from "./head/MobileMenu";

export default function Header() {  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLearningPath = pathname?.startsWith('/learning');

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (!isLearningPath) {
      router.push('/learning/dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">          {/* Logo */}
          <Link 
            href={isAuthenticated ? "/learning/dashboard" : "/explore"} 
            className="text-xl font-bold text-purple-600"
          >
            SumajCode
          </Link>

          {/* Desktop Navigation */}          <Navigation 
            isLearningPath={isLearningPath}
            isAuthenticated={isAuthenticated}
          />

          {/* Authentication Buttons */}
          <AuthButtons
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
