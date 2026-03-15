// ==============================================================
// REPOSITÓRIO: PERIODICO
// ==============================================================

export type FiltrosBusca = {
  termo?: string; // Para buscar por ISSN ou título
  area?: string; // Filtro de área de Avaliação
  estrato?: string; // Filtro de estrato (A1, B2, etc)
};

import { PrismaClient } from "@prisma/client";
import { Periodico, EstratoQualis } from "../entities/Periodico.js";

export class PeriodicoRepository {
  private readonly db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  getDb(): PrismaClient { return this.db; }

  // ==============================================================
  // MÉTODOS DE PERSISTÊNCIA
  // ==============================================================

  async salvarEmLote(periodicos: Periodico[]): Promise<void> {
    const dados = periodicos.map((p) => ({
      id: p.getId(),
      issn: p.getIssn(),
      titulo: p.getTitulo(),
      areaAvaliacao: p.getAreaAvaliacao(),
      estrato: p.getEstrato(),
    }));

    await this.db.periodico.createMany({ data: dados }); // createMany é mais rápido do que salvar um por um num loop
  }
  

  async contarTodos(): Promise<number> { return await this.db.periodico.count(); }

  // ==============================================================
  // MÉTODOS DE CONSULTA (LEITURA)
  // ==============================================================

  // RF02
  async listarAreas(): Promise<string[]> {
    const resultados = await this.db.periodico.findMany({
      select: { areaAvaliacao: true },
      distinct: ["areaAvaliacao"],
      orderBy: { areaAvaliacao: "asc" },
    });

    return resultados.map((r) => r.areaAvaliacao);
  }
  // RF03, RF04 e RF05
  async buscarPeriodicos(filtros: FiltrosBusca, pagina: number = 1, limite: number = 20) {
    const skip = (pagina - 1) * limite;
    const where: any = {};

    // montagem dinâmica da cláusula WHERE baseada no que o user preencheu
    if (filtros.area) where.areaAvaliacao = filtros.area;
    if (filtros.estrato) where.estrato = filtros.estrato;
    if (filtros.termo) {
      where.OR = [
        { titulo: { contains: filtros.termo } },
        { issn: { contains: filtros.termo } }
      ];
    }

    // promise.all executa a contagem e a busca ao mesmo tempo
    const [total, dadosPrisma] = await Promise.all([
      this.db.periodico.count({ where }),
      this.db.periodico.findMany({
        where,
        skip,
        take: limite,
        orderBy: { titulo: 'asc' }
      })
    ]);

    // mapeamento dos dados do Prisma de volta para a nossa Classe de Domínio
    const dados = dadosPrisma.map(p => new Periodico(p.id, p.issn, p.titulo, p.areaAvaliacao, p.estrato as EstratoQualis));

    return {
      total,
      paginaAtual: pagina,
      totalPaginas: Math.ceil(total / limite),
      dados: dados.map(p => ({
        id: p.getId(),
        issn: p.getIssn(),
        titulo: p.getTitulo(),
        areaAvaliacao: p.getAreaAvaliacao(),
        estrato: p.getEstrato()
      }))
    };
  }
}
