// ==============================================================
// REPOSITÓRIO: PERIODICO
// ==============================================================

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

    // createMany é mais rápido do que salvar um por um num loop
    await this.db.periodico.createMany({
      data: dados,
    });
  }
  
  async contarTodos(): Promise<number> {
    return await this.db.periodico.count();
  }
}