// ==============================================================
// HOOK: ESTATÍSTICAS
// ==============================================================

import { useState, useCallback } from "react";
import { apiService } from "../services/ApiService";
import type { EstatisticaEstrato } from "../types/periodico";

export interface UseEstatisticas {
  estatisticas: EstatisticaEstrato[];
  loading: boolean;
  erro: string | null;
  buscar: (area?: string) => Promise<void>;
}

export function useEstatisticas(): UseEstatisticas {
  // ==============================================================
  // ESTADOS INTERNOS
  // ==============================================================
  const [estatisticas, setEstatisticas] = useState<EstatisticaEstrato[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);

  // ==============================================================
  // AÇÕES
  // ==============================================================
  const buscar = useCallback(async (area?: string) => {
    setLoading(true);
    setErro(null);

    try {
      const resposta = await apiService.obterEstatisticas(area);
      setEstatisticas(resposta);
    } catch (err) {
      console.error("Erro no hook useEstatisticas:", err);
      setErro("Erro ao buscar estatísticas. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { estatisticas, loading, erro, buscar };
}