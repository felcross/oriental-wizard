"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TitleScreen } from "./TitleScreen";
import { SyncedMode } from "./SyncedMode";
import { AmbientMode } from "./AmbientMode";
import type { Historia } from "@/lib/types";

type EstadoWizard = "titulo" | "reproduzindo";

interface WizardProps {
  historia: Historia;
}

export function Wizard({ historia }: WizardProps) {
  const [estado, setEstado] = useState<EstadoWizard>("titulo");

  return (
    <div className="relative h-dvh w-full bg-hokusai-deep-blue">
      <AnimatePresence mode="wait">
        {estado === "titulo" && (
          <TitleScreen
            key="titulo"
            titulo={historia.titulo}
            subtitulo={historia.subtitulo}
            aoComecar={() => setEstado("reproduzindo")}
          />
        )}

        {estado === "reproduzindo" && historia.modo === "sincronizado" && (
          <SyncedMode
            key="sincronizado"
            historia={historia}
            onFinalizar={() => setEstado("titulo")}
          />
        )}

        {estado === "reproduzindo" && historia.modo === "ambiente" && (
          <AmbientMode
            key="ambiente"
            historia={historia}
            onFinalizar={() => setEstado("titulo")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
