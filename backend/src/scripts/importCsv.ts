//    ==============================================================
//            SCRIPT DE IMPORTAÇÃO DE DADOS DA CAPES (CSV)
//    ==============================================================

// ===================================================================== \\
//                       LÓGICA DO SCRIPT:                               \\
//                                                                       \\ 
//   1 salva no banco a cada 5000 linhas                                 \\
//   2 ler o arquivo em formato de stream (aos poucos)                   \\
//   3 extrai os dados baseados nas colunas exatas do CSV da sucupira    \\
//   4 gera uuid nativo a partir da classe que criei                     \\
//   5 Quando atinge o tamanho do lote, pausa para salvar no banco       \\  
//   6 salva os que sobraram no último lote                              \\
//                                                                       \\
// ===================================================================== \\

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { Periodico, EstratoQualis } from "../domain/entities/Periodico.js";
import { PeriodicoRepository } from "../domain/repositories/PeriodicoRepository.js";

const prisma = new PrismaClient();
const repository = new PeriodicoRepository(prisma);

async function importarDados() {
  console.log("Iniciando a leitura do CSV...");
  const caminhoArquivo = path.resolve("data", "qualis.csv");
  const lotePeriodicos: Periodico[] = [];
  const TAMANHO_LOTE = 5000; // 1
  let totalProcessado = 0;

  fs.createReadStream(caminhoArquivo) // 2
    .pipe(csv())
    .on("data", async (linha) => {
      // 3
      const issn = linha["ISSN"]?.trim() || "SEM-ISSN";
      const titulo = linha["Título"]?.trim() || "SEM TITULO";
      const area = linha["Área de Avaliação"]?.trim() || "DESCONHECIDA";
      const estrato = linha["Estrato"]?.trim() as EstratoQualis;
      const id = crypto.randomUUID(); // 4
      const novoPeriodico = new Periodico(id, issn, titulo, area, estrato);

      lotePeriodicos.push(novoPeriodico);

      // 5
      if (lotePeriodicos.length >= TAMANHO_LOTE) {
        const itensParaSalvar = [...lotePeriodicos];
        lotePeriodicos.length = 0; // limpa o array atual

        await repository.salvarEmLote(itensParaSalvar);
        totalProcessado += TAMANHO_LOTE;
        console.log(`⏳ Já salvamos ${totalProcessado} periódicos no banco...`);
      }
    })
    .on("end", async () => {
      // 6
      if (lotePeriodicos.length > 0) {
        await repository.salvarEmLote(lotePeriodicos);
        totalProcessado += lotePeriodicos.length;
      }

      const totalNoBanco = await repository.contarTodos();
      console.log("=========================================");
      console.log(`IMPORTAÇÃO CONCLUÍDA COM SUCESSO`);
      console.log(`Total de registros no SQLite: ${totalNoBanco}`);
      console.log("=========================================");

      await prisma.$disconnect();
    })
    .on("error", (erro) => {
      console.error("Erro ao ler o CSV:", erro);
    });
}
importarDados();
