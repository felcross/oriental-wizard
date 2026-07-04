"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HistoriaAmbiente } from "@/lib/types";

interface AmbientModeProps {
  historia: HistoriaAmbiente;
  onFinalizar: () => void;
}

interface FotoAtiva {
  chave: number;
  src: string;
  origem: "cima" | "baixo" | "esquerda" | "direita" | "centro";
  top: number;
  left: number;
}

const origens: FotoAtiva["origem"][] = ["cima", "baixo", "esquerda", "direita", "centro"];

const deslocamentoInicial: Record<FotoAtiva["origem"], { x: number; y: number }> = {
  cima: { x: 0, y: -80 },
  baixo: { x: 0, y: 80 },
  esquerda: { x: -80, y: 0 },
  direita: { x: 80, y: 0 },
  centro: { x: 0, y: 0 },
};

let contador = 0;

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

export function AmbientMode({ historia, onFinalizar }: AmbientModeProps) {
  const [fotos, setFotos] = useState<FotoAtiva[]>([]);
  const [acabou, setAcabou] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileRef = useRef(isMobile());

  useEffect(() => {
    mobileRef.current = isMobile();
    audioRef.current?.play();

    const maxFotos = mobileRef.current ? 2 : 3;

    const agendarProximaFoto = () => {
      const { intervaloMinSegundos, intervaloMaxSegundos, poolImagens } = historia;
      const intervaloMs =
        (intervaloMinSegundos +
          Math.random() * (intervaloMaxSegundos - intervaloMinSegundos)) *
        1000;

      timeoutRef.current = setTimeout(() => {
        const src = poolImagens[Math.floor(Math.random() * poolImagens.length)];
        const origem = origens[Math.floor(Math.random() * origens.length)];
        const novaFoto: FotoAtiva = {
          chave: contador++,
          src,
          origem,
          top: 15 + Math.random() * 55,
          left: 10 + Math.random() * 60,
        };

        setFotos((atual) => [...atual.slice(-(maxFotos - 1)), novaFoto]);
        agendarProximaFoto();
      }, intervaloMs);
    };

    agendarProximaFoto();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [historia]);

  const handleRepetir = () => {
    setAcabou(false);
    setFotos([]);
    audioRef.current?.play();
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <audio
        ref={audioRef}
        src={historia.audio}
        preload="auto"
        onEnded={() => setAcabou(true)}
      />

      <AnimatePresence>
        {fotos.map((foto) => {
          const delta = deslocamentoInicial[foto.origem];
          return (
            <motion.img
              key={foto.chave}
              src={foto.src}
              alt=""
              initial={{ opacity: 0, x: delta.x * 5, y: delta.y * 5, scale: 0.92 }}
              animate={{ opacity: 0.85, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              style={{ top: `${foto.top}%`, left: `${foto.left}%` }}
              className="absolute w-56 -translate-x-1/2 -translate-y-1/2 rounded-sm object-cover shadow-2xl sm:w-72 md:w-80"
            />
          );
        })}
      </AnimatePresence>

      {/* Vinheta de tinta — mais intensa em mobile */}
      <div className="ink-vignette" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sumi/30 via-transparent to-sumi/50" />

      {acabou && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-20 z-10 flex flex-col items-center gap-4 sm:bottom-16"
        >
          {/* Botão repetir — estilo oriental */}
          <button
            onClick={handleRepetir}
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
    </div>
  );
}
