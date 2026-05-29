import React from 'react';
import { SYSTEM_EDITORIAL_KEYWORDS } from '../utils/moderation';

interface EditorialTextProps {
  text: string;
}

export function EditorialText({ text }: EditorialTextProps) {
  if (!text) return null;

  // Let's build a regular expression based on the editorial keywords
  // Escape potential regex characters in keywords just in case
  const escapedKeywords = SYSTEM_EDITORIAL_KEYWORDS.map(k =>
    k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  );

  // Match whole words or custom phrases
  // Wrap with boundary assertion, case insensitive
  const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');

  const parts = text.split(regex);
  if (parts.length <= 1) {
    return <span className="font-sans text-[#0F3D2E]/90 text-sm leading-relaxed">{text}</span>;
  }

  return (
    <span className="font-sans text-[#0F3D2E]/90 text-sm leading-relaxed">
      {parts.map((part, index) => {
        const isKeyword = SYSTEM_EDITORIAL_KEYWORDS.some(
          k => k.toLowerCase() === part.toLowerCase()
        );

        if (isKeyword) {
          return (
            <span
              key={index}
              className="inline-block font-sans font-semibold text-[#0F3D2E] border-b border-[#C49A45]/40 bg-[#0F3D2E]/5 px-1 rounded-sm shadow-xs transition-all duration-300 pointer-events-none select-none"
              title="Verified High-Interest Insight Flag"
            >
              {part}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
