// src/components/Typewriter.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const roles = [
  "Engenheiro de Software & Sistemas",
  "Desenvolvedor Full-Stack (Web & Desktop)",
  "Especialista em Cloud, APIs & Real-Time"
];

export default function Typewriter() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const handleTyping = () => {
      const fullText = roles[textIndex];
      if (isDeleting) {
        setCurrentText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2400);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timeout = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <span className="inline-flex items-center text-lg sm:text-xl md:text-2xl font-medium text-zinc-300 min-h-[36px]">
      <span className="tracking-tight">{currentText}</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-[2px] h-5 md:h-6 bg-white ml-1.5 inline-block"
        aria-hidden="true"
      />
    </span>
  );
}