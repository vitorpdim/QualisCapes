// ==============================================================
// HOOK: PERIÓDICOS E PAGINAÇÃO
// ==============================================================

import { useState, useCallback } from "react";
import { apiService } from "../services/ApiService";
import type { FiltrosBusca, Periodico } from "../types/periodico";

export interface UsePeriodicos {
  periodicos: Periodico[];
  loading: boolean;
  erro: string | null;
  total: number;
  paginaAtual: number;
  totalPaginas: number;
  buscar: (filtros: FiltrosBusca, pagina?: number) => Promise<void>;
}

// ==============================================================
// ESTADOS INTERNOS
// ==============================================================
export function usePeriodicos(): UsePeriodicos {

  const [periodicos, setPeriodicos] = useState<Periodico[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);
  
  const [total, setTotal] = useState<number>(0);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(0);

  // ==============================================================
  // AÇÕES
  // ==============================================================

  const buscar = useCallback(async (filtros: FiltrosBusca, pagina: number = 1) => {
    setLoading(true);
    setErro(null);

    try {
      const resposta = await apiService.buscarPeriodicos(filtros, pagina, 20);
      
      setPeriodicos(resposta.dados);
      setTotal(resposta.total);
      setPaginaAtual(resposta.paginaAtual);
      setTotalPaginas(resposta.totalPaginas);
    } catch (err) {
      console.error("Erro no hook use Periodicos:", err);
      setErro("Erro ao buscar periódicos, verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { periodicos, loading, erro, total, paginaAtual, totalPaginas, buscar };
}