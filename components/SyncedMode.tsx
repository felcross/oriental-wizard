"use client";

import { motion } from "framer-motion";
import { ScrollFrame } from "./ScrollFrame";
import { useAudioTimeline } from "@/lib/useAudioTimeline";
import type { HistoriaSincronizada } from "@/lib/types";

interface SyncedModeProps {
  historia: HistoriaSincronizada;
  onFinalizar: () => void;
}

export function SyncedMode({ historia, onFinalizar }: SyncedModeProps) {
  const { audioRef, cueAtual, indiceCueAtual, acabou, destacarSelo, iniciar, repetir } =
    useAudioTimeline(historia.timeline);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full w-full flex-col items-center justify-center gap-6 px-4 sm:gap-8 sm:px-6"
      onAnimationComplete={iniciar}
    >
      <audio ref={audioRef} src={historia.audio} preload="auto" />

      {cueAtual ? (
        <ScrollFrame
          imagemSrc={cueAtual.imagem}
          legenda={cueAtual.legenda}
          destacarSelo={destacarSelo}
          chaveTroca={indiceCueAtual}
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="h-2 w-2 animate-pulse rounded-full bg-ember/50" />
          <p className="font-body text-xs tracking-widest text-washi/30 uppercase">
            Preparando...
          </p>
        </div>
      )}

      {acabou && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Botão repetir — estilo oriental */}
          <button
            onClick={repetir}
            className="group relative"
          >
            <span className="absolute inset-0 border border-ember/30 transition-all duration-500 group-hover:border-ember/60" />
            <span className="absolute inset-[2px] border border-ember/15 transition-all duration-500 group-hover:border-ember/30" />
            <span className="relative block px-10 py-3 font-display text-base tracking-wider text-washi/90 transition-colors duration-300 group-hover:text-washi sm:px-12">
              Contar novamente
            </span>
          </button>

          {/* Link encerrar */}
          <button
            onClick={onFinalizar}
            className="font-body text-[10px] uppercase tracking-[0.25em] text-washi/30 transition-colors duration-300 hover:text-washi/60 sm:text-xs"
          >
            Encerrar
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
