// ==============================================================
// CONTROLLER: PERIODICO
// ==============================================================

import { Request, Response } from "express";
import { PeriodicoRepository, FiltrosBusca } from "../domain/repositories/PeriodicoRepository.js";

export class PeriodicoController {
  private readonly repository: PeriodicoRepository;

  constructor(repository: PeriodicoRepository) {
    this.repository = repository;
  }

  listarAreas = async (req: Request, res: Response): Promise<void> => {
    try {
      const areas = await this.repository.listarAreas();
      res.status(200).json(areas);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "erro interno ao buscar áreas." });
    }
  };

  buscarPeriodicos = async (req: Request, res: Response): Promise<void> => {
    try {
      // extraindo os parâmetros da URL
      const filtros: FiltrosBusca = {
        termo: req.query.termo as string | undefined,
        area: req.query.area as string | undefined,
        estrato: req.query.estrato as string | undefined,
      };

      const pagina = req.query.pagina ? parseInt(req.query.pagina as string, 10) : 1;
      const limite = req.query.limite ? parseInt(req.query.limite as string, 10) : 20;

      const resultados = await this.repository.buscarPeriodicos(filtros, pagina, limite);
      res.status(200).json(resultados);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "erro interno ao buscar periódicos." });
    }
  };

  obterEstatisticas = async (req: Request, res: Response): Promise<void> => {
    try {
      const area = req.query.area as string | undefined;
      const estatisticas = await this.repository.obterResumoPorEstrato(area);
      res.status(200).json(estatisticas);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "erro interno ao gerar estatísticas." });
    }
  };
}