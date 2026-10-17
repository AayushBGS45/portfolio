// Inline SVG icon components — used because lucide-react in this version
// does not export Github or Linkedin icons.
import React from 'react';

export function GithubIcon({ size = 18, strokeWidth = 1.5, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18, strokeWidth = 1.5, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function LeetcodeIcon({ size = 18, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.247 2.198 5.86 2.17 8.084-.067l2.67-2.673a1.379 1.379 0 0 0-.97-2.352 1.373 1.373 0 0 0-.973.402l-2.668 2.673a3.163 3.163 0 0 1-4.49.031l-4.279-4.193a3.544 3.544 0 0 1-.762-1.09 3.328 3.328 0 0 1-.208-.606 3.376 3.376 0 0 1-.039-1.442 3.17 3.17 0 0 1 .726-1.265l3.854-4.126 5.406-5.788a1.374 1.374 0 0 0-.973-2.352zM16.12 7.765a1.374 1.374 0 0 0-.973 2.352l2.668 2.673a3.163 3.163 0 0 1 .031 4.49l-4.279 4.193a1.374 1.374 0 1 0 1.942 1.946l4.279-4.193a5.938 5.938 0 0 0 1.271-1.818 5.83 5.83 0 0 0 .349-1.017 5.527 5.527 0 0 0 .062-2.362 5.35 5.35 0 0 0-.125-.513 5.266 5.266 0 0 0-1.209-2.104l-2.668-2.673a1.374 1.374 0 0 0-.973-.402zm-5.32 3.735a1.374 1.374 0 0 0-1.374 1.374v.025a1.374 1.374 0 0 0 1.374 1.374h9.61a1.374 1.374 0 0 0 1.374-1.374v-.025a1.374 1.374 0 0 0-1.374-1.374z" />
    </svg>
  );
}

