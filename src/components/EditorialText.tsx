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
    return <span className="font-sans text-[#082D20] text-sm leading-relaxed">{text}</span>;
  }

  return (
    <span className="font-sans text-[#082D20] text-sm leading-relaxed">
      {parts.map((part, index) => {
        const isKeyword = SYSTEM_EDITORIAL_KEYWORDS.some(
          k => k.toLowerCase() === part.toLowerCase()
        );

        if (isKeyword) {
          return (
            <span
              key={index}
              className="inline-block font-sans font-semibold text-[#082D20] border-b-2 border-[#E6A71B] bg-[#E6A71B]/12 px-1.5 py-0.5 rounded-md shadow-[0_2px_8px_rgba(230,167,27,0.15)] transition-all duration-300 pointer-events-none select-none"
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
