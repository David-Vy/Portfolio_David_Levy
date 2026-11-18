// src/components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import SocialIcons from "./SocialIcons";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-black py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10 bg-white/[0.04] flex items-center justify-center"
            aria-label="Página Inicial"
          >
            <Image
              src="/logos/favicon.png"
              alt="David Levy Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </Link>
          <span className="text-zinc-400">
            &copy; {currentYear} David Levy · Software Engineer
          </span>
        </div>

        <div className="flex items-center gap-6">
          <SocialIcons />

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            aria-label={t.footer.backToTop}
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
