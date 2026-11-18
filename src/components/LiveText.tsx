// src/components/LiveText.tsx
"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export interface LiveTextProps {
  text: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  mode?: "words" | "chars";
  stagger?: number;
  showCursor?: boolean;
}

export default function LiveText({
  text,
  className = "",
  as: Component = "span",
  mode = "words",
  stagger,
  showCursor = false,
}: LiveTextProps) {
  const { language } = useLanguage();
  const instanceId = useId();

  if (mode === "chars") {
    const chars = Array.from(text);
    const charStagger = stagger ?? 0.015;

    const containerVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: charStagger,
          delayChildren: 0.01,
        },
      },
    };

    const charVariants = {
      hidden: {
        opacity: 0,
        y: 3,
        filter: "blur(2px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: 0.15,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      },
    };

    return (
      <Component className={className}>
        <motion.span
          key={`${language}-${text}-${instanceId}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="inline"
        >
          {chars.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={charVariants}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          {showCursor && (
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0, 1, 0] }}
              transition={{
                duration: 0.7,
                delay: chars.length * charStagger,
                ease: "linear",
              }}
              className="inline-block w-[1.5px] h-[0.9em] bg-white/70 ml-0.5 translate-y-[1px]"
              aria-hidden="true"
            />
          )}
        </motion.span>
      </Component>
    );
  }

  // Modo padrão: palavra por palavra (word-by-word streaming live writing)
  const words = text.split(" ");
  const wordStagger = stagger ?? (words.length > 25 ? 0.018 : 0.026);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordStagger,
        delayChildren: 0.01,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 5,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        key={`${language}-${text}-${instanceId}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="inline"
      >
        {words.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
            {index < words.length - 1 && " "}
          </React.Fragment>
        ))}
        {showCursor && (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1, 0] }}
            transition={{
              duration: 0.8,
              delay: words.length * wordStagger,
              ease: "linear",
            }}
            className="inline-block w-[1.5px] h-[0.9em] bg-white/70 ml-1 translate-y-[1px]"
            aria-hidden="true"
          />
        )}
      </motion.span>
    </Component>
  );
}
