"use client";

import { motion } from "framer-motion";

interface TitleScreenProps {
  titulo: string;
  subtitulo?: string;
  aoComecar: () => void;
}

export function TitleScreen({ titulo, subtitulo, aoComecar }: TitleScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-center"
    >
      {/* Linha vertical decorativa superior */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="h-20 w-px origin-top bg-gradient-to-b from-transparent via-fuji-sky/60 to-fuji-sky/30"
      />

      {/* Selo circular estilizado */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative flex h-16 w-16 items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full border border-fuji-sky/40" />
        <div className="absolute inset-1 rounded-full border border-fuji-sky/20" />
        <div className="h-2.5 w-2.5 rounded-full bg-hokusai-signature shadow-[0_0_12px_rgba(188,58,51,0.5)]" />
      </motion.div>

      {/* Título e subtítulo */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="space-y-4"
      >
        <h1 className="font-display text-4xl tracking-wide text-sea-foam sm:text-5xl md:text-6xl">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="font-body text-xs font-light tracking-[0.25em] text-sea-foam/50 uppercase sm:text-sm">
            {subtitulo}
          </p>
        )}
      </motion.div>

      {/* Linha horizontal decorativa */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="h-px w-32 origin-center bg-gradient-to-r from-transparent via-fuji-sky/50 to-transparent"
      />

      {/* Botão Começar — estilo oriental com borda dupla */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        onClick={aoComecar}
        className="group relative mt-4"
      >
        {/* Borda externa */}
        <span className="absolute inset-0 border border-fuji-sky/30 transition-all duration-500 group-hover:border-fuji-sky/60 group-hover:shadow-[0_0_20px_rgba(229,204,160,0.15)]" />
        {/* Borda interna */}
        <span className="absolute inset-[3px] border border-fuji-sky/15 transition-all duration-500 group-hover:border-fuji-sky/30" />
        {/* Conteúdo */}
        <span className="relative block px-12 py-3.5 font-display text-lg tracking-wider text-sea-foam/90 transition-colors duration-300 group-hover:text-sea-foam sm:px-14 sm:py-4">
          Começar
        </span>
        {/* Elemento decorativo lateral esquerdo */}
        <span className="absolute left-0 top-1/2 h-6 w-px -translate-x-3 -translate-y-1/2 bg-fuji-sky/40 transition-all duration-500 group-hover:h-8 group-hover:bg-fuji-sky/70" />
      </motion.button>

      {/* Texto sutil abaixo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="mt-2 font-body text-[10px] uppercase tracking-[0.3em] text-sea-foam/25 sm:text-xs"
      >
        Pressione para iniciar
      </motion.p>
    </motion.div>
  );
}
