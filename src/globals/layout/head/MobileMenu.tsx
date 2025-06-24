"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const isLearningPath = pathname?.startsWith('/learning');
  const isHome = pathname === '/';

  if (!isOpen) return null;

  return (
    <div className="md:hidden py-4">
      <nav className="flex flex-col space-y-4">
        <Link
          href="/"
          className={`text-gray-600 hover:text-purple-600 ${
            isHome ? 'text-purple-600 font-medium' : ''
          }`}
          onClick={onClose}
        >
          Explore
        </Link>
        <Link
          href="/learning/dashboard"
          className={`text-gray-600 hover:text-purple-600 ${
            isLearningPath ? 'text-purple-600 font-medium' : ''
          }`}
          onClick={onClose}
        >
          My Learning
        </Link>
      </nav>
    </div>
  );
}
