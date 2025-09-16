"use client";

import Link from "next/link";
import { Sparkle } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-black/10 dark:border-white/15 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative font-sans font-semibold text-[#465C50] text-3xl tracking-tight group-hover:opacity-90 transition">
              <Sparkle
                className="md:size-4 size-2 absolute md:top-1 md:-left-5 top-0.5 -left-2 text-[#E76B39] fill-[#E76B39]"
              />
              Leatny
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
