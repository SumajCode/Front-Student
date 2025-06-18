import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                he
                ight="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-white"
              >
                <path
                  d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z"
                  fill="currentColor"
                />
                <path
                  d="M22 16C22 19.314 19.314 22 16 22C12.686 22 10 19.314 10 16C10 12.686 12.686 10 16 10C19.314 10 22 12.686 22 16Z"
                  fill="black"
                />
              </svg>
              <span className="ml-2 font-bold text-xl">SumajCode</span>
            </Link>
          </div>
          <div className="text-gray-400 text-sm">© 2025 SumajCode.</div>
        </div>
      </div>
    </footer>
  );
}
