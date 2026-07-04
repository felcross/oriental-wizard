import { useCallback, useEffect, useRef, useState } from "react";
import type { TimelineCue } from "./types";

interface UseAudioTimelineResult {
  audioRef: React.RefObject<HTMLAudioElement>;
  cueAtual: TimelineCue | null;
  indiceCueAtual: number;
  acabou: boolean;
  destacarSelo: boolean;
  iniciar: () => void;
  repetir: () => void;
}

/**
 * Ouve o <audio> e dispara a troca de imagem/card conforme a timeline.
 * O selo (indicador visual) acende por um instante toda vez que a cue muda.
 */
export function useAudioTimeline(
  timeline: TimelineCue[]
): UseAudioTimelineResult {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [indiceCueAtual, setIndiceCueAtual] = useState(-1);
  const [acabou, setAcabou] = useState(false);
  const [destacarSelo, setDestacarSelo] = useState(false);
  const seloTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const timelineOrdenada = useRef(
    [...timeline].sort((a, b) => a.tempo - b.tempo)
  );

  useEffect(() => {
    timelineOrdenada.current = [...timeline].sort((a, b) => a.tempo - b.tempo);
  }, [timeline]);

  const acenderSelo = useCallback(() => {
    setDestacarSelo(true);
    if (seloTimeoutRef.current) clearTimeout(seloTimeoutRef.current);
    seloTimeoutRef.current = setTimeout(() => setDestacarSelo(false), 1600);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const aoAtualizarTempo = () => {
      const t = audio.currentTime;
      const cues = timelineOrdenada.current;
      let novoIndice = -1;
      for (let i = 0; i < cues.length; i++) {
        if (t >= cues[i].tempo) novoIndice = i;
      }
      setIndiceCueAtual((atual) => {
        if (novoIndice !== atual && novoIndice >= 0) {
          acenderSelo();
        }
        return novoIndice;
      });
    };

    const aoTerminar = () => setAcabou(true);

    audio.addEventListener("timeupdate", aoAtualizarTempo);
    audio.addEventListener("ended", aoTerminar);
    return () => {
      audio.removeEventListener("timeupdate", aoAtualizarTempo);
      audio.removeEventListener("ended", aoTerminar);
      if (seloTimeoutRef.current) clearTimeout(seloTimeoutRef.current);
    };
  }, [acenderSelo]);

  const iniciar = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const repetir = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setIndiceCueAtual(-1);
    setAcabou(false);
    audio.play();
  }, []);

  const cueAtual =
    indiceCueAtual >= 0 ? timelineOrdenada.current[indiceCueAtual] : null;

  return { audioRef, cueAtual, indiceCueAtual, acabou, destacarSelo, iniciar, repetir };
}
