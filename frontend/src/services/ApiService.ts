// ==============================================================
// SERVIÇOS DE API
// ==============================================================

import type { FiltrosBusca, RespostaPaginada, EstatisticaEstrato } from '../types/periodico';

export class ApiService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) { this.baseUrl = baseUrl; }

  // ==============================================================
  // GETTERS & SETTERS
  // ==============================================================

  getBaseUrl(): string { return this.baseUrl; }

  // ==============================================================
  // MÉTODOS DE CONSULTA
  // ==============================================================

  async listarAreas(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/areas`);
      return response.ok ? await response.json() : [];
    } catch (erro) {
      console.error("Erro ao listar áreas:", erro);
      return [];
    }
  }

  async buscarPeriodicos(filtros: FiltrosBusca, pagina: number = 1, limite: number = 20): Promise<RespostaPaginada> {
    try {
      const params = new URLSearchParams();

      if (filtros.termo) params.append("termo", filtros.termo);
      if (filtros.area) params.append("area", filtros.area);
      if (filtros.estrato) params.append("estrato", filtros.estrato);
      
      params.append("pagina", pagina.toString());
      params.append("limite", limite.toString());

      const response = await fetch(`${this.baseUrl}/periodicos?${params.toString()}`);
      
      if (!response.ok) throw new Error("Erro na busca de periódicos");
      
      return await response.json();
    } catch (erro) {
      console.error("Erro ao buscar periódicos:", erro);
      throw erro; // repasso o erro pra interface mostrar
    }
  }

  async obterEstatisticas(area?: string): Promise<EstatisticaEstrato[]> {
    try {
      const query = area ? `?area=${encodeURIComponent(area)}` : "";
      const response = await fetch(`${this.baseUrl}/estatisticas${query}`);
      
      return response.ok ? await response.json() : [];
    } catch (erro) {
      console.error("Erro ao obter estatísticas:", erro);
      return [];
    }
  }
}

// ==============================================================
// INSTÂNCIA GLOBAL (SINGLETON)
// ==============================================================

export const apiService = new ApiService("http://localhost:3000/api");