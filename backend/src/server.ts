// ==============================================================
// SERVIDOR WEB (express)
// ==============================================================

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PeriodicoRepository } from "./domain/repositories/PeriodicoRepository.js";
import { PeriodicoController } from "./controllers/PeriodicoController.js";

export class Server {
  private readonly app: express.Application;
  private readonly porta: number;
  private readonly prisma: PrismaClient;

  constructor(porta: number) {
    this.app = express();
    this.porta = porta;
    this.prisma = new PrismaClient();
    
    this.configurarMiddlewares();
    this.configurarRotas();
  }

  private configurarMiddlewares(): void {
    this.app.use(cors()); // permite que o front acesse a API
    this.app.use(express.json());
  }

  private configurarRotas(): void {
    
    const repository = new PeriodicoRepository(this.prisma); // 1. instancia o banco
    const controller = new PeriodicoController(repository); // 2. injeta o banco no controller

    // 3. declara as portas de entrada (Endpoints)
    this.app.get("/api/areas", controller.listarAreas);
    this.app.get("/api/periodicos", controller.buscarPeriodicos);
    this.app.get("/api/estatisticas", controller.obterEstatisticas);
  }

  public iniciar(): void {
    this.app.listen(this.porta, () => {
      console.log(`=========================================`);
      console.log(`API INICIADA E RODANDO`);
      console.log(`Porta: ${this.porta}`);
      console.log(`---> teste: http://localhost:${this.porta}/api/periodicos`);
      console.log(`=========================================`);
    });
  }
}

const servidor = new Server(3000);
servidor.iniciar();