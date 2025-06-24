import * as React from "react";

export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
    </svg>
  );
}

export function DocumentTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V7.875L14.25 1.5H5.625zM7 9.75A.75.75 0 017.75 9h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 017 9.75zm0 3A.75.75 0 017.75 12h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 017 12.75zm0 3A.75.75 0 017.75 15h6.5a.75.75 0 010 1.5h-6.5A.75.75 0 017 15.75z" clipRule="evenodd" />
    </svg>
  );
}
