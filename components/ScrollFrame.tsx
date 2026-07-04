"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ScrollFrameProps {
  imagemSrc: string;
  legenda?: string;
  destacarSelo: boolean;
  chaveTroca: string | number;
}

/**
 * Moldura de pergaminho: linha dupla dourada fina, cantos suaves.
 * O selo no canto inferior direito é o próprio indicador de "conteúdo novo" —
 * pulsa em vermelho-laca sempre que a timeline avança.
 */
export function ScrollFrame({
  imagemSrc,
  legenda,
  destacarSelo,
  chaveTroca,
}: ScrollFrameProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative rounded-sm border border-ember/40 p-2">
        <div className="rounded-[2px] border border-ember/70 p-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1px] bg-indigo-void">
            <AnimatePresence mode="wait">
              <motion.img
                key={chaveTroca}
                src={imagemSrc}
                alt={legenda ?? ""}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Selo — indicador de avanço da história */}
      <div
        className={`absolute -bottom-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-lacquer bg-sumi ${
          destacarSelo ? "animate-seal-pulse" : ""
        }`}
      >
        <div className="h-3 w-3 rounded-full bg-lacquer" />
      </div>

      {legenda && (
        <p className="mt-6 text-center font-display text-lg leading-relaxed text-washi/90">
          {legenda}
        </p>
      )}
    </div>
  );
}
