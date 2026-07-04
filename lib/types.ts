export type ModoApresentacao = "sincronizado" | "ambiente";

export interface TimelineCue {
  /** segundo do áudio em que essa imagem deve aparecer */
  tempo: number;
  imagem: string;
  legenda?: string;
}

export interface HistoriaSincronizada {
  id: string;
  titulo: string;
  subtitulo?: string;
  modo: "sincronizado";
  audio: string;
  timeline: TimelineCue[];
}

export interface HistoriaAmbiente {
  id: string;
  titulo: string;
  subtitulo?: string;
  modo: "ambiente";
  audio: string;
  poolImagens: string[];
  intervaloMinSegundos: number;
  intervaloMaxSegundos: number;
}

export type Historia = HistoriaSincronizada | HistoriaAmbiente;
