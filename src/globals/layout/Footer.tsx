import Link from "next/link";
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <FooterLogo />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
}
