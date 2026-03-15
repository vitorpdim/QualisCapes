export type EstratoQualis = "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C";

export interface Periodico {
  id: string;
  issn: string;
  titulo: string;
  areaAvaliacao: string;
  estrato: EstratoQualis;
}

export interface FiltrosBusca {
  termo?: string;
  area?: string;
  estrato?: string;
}

export interface RespostaPaginada {
  total: number;
  paginaAtual: number;
  totalPaginas: number;
  dados: Periodico[];
}

export interface EstatisticaEstrato {
  estrato: EstratoQualis;
  quantidade: number;
}
