//    ==============================================================
//            SCRIPT DE IMPORTAÇÃO DE DADOS DA CAPES (CSV)
//    ==============================================================

// ===================================================================== \\
//                       LÓGICA DO SCRIPT:                               \\
//                                                                       \\
//   1 Limpa o banco de dados antes de iniciar para evitar duplicidade   \\
//   2 Lê o arquivo em formato de stream (com controle de backpressure)  \\
//   3 Extrai os dados baseados nas colunas exatas do CSV da Sucupira    \\
//   4 Gera UUID nativo para cada registro mapeado                       \\
//   5 Quando atinge o tamanho do lote, pausa para salvar no banco       \\
//   6 Salva os registros que sobraram no último lote                    \\
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
const TAMANHO_LOTE = 5000;
const CAMINHO_ARQUIVO = path.resolve("data", "qualis.csv");

function criarPeriodicoDaLinha(linha: any): Periodico {
  const issn = linha["ISSN"]?.trim() || "SEM-ISSN";
  const titulo = linha["Título"]?.trim() || "SEM TITULO";
  const area = linha["Área de Avaliação"]?.trim() || "DESCONHECIDA";
  const estrato = linha["Estrato"]?.trim() as EstratoQualis;
  
  const id = crypto.randomUUID();
  
  return new Periodico(id, issn, titulo, area, estrato);
}

async function prepararBancoDados(): Promise<void> {
  console.log("limpando o banco de dados antes de iniciar...");
  await prisma.periodico.deleteMany();
}

// func principal
async function importarDados() {
  await prepararBancoDados();

  console.log("Iniciando a leitura do CSV...");

  let lotePeriodicos: Periodico[] = [];
  let totalProcessado = 0;

  const stream = fs.createReadStream(CAMINHO_ARQUIVO).pipe(csv());

  try {
    for await (const linha of stream) {
      const novoPeriodico = criarPeriodicoDaLinha(linha);
      lotePeriodicos.push(novoPeriodico);

      if (lotePeriodicos.length >= TAMANHO_LOTE) {
        await repository.salvarEmLote(lotePeriodicos);
        totalProcessado += lotePeriodicos.length;
        console.log(`Processados e salvos: ${totalProcessado} periódicos...`);
        
        lotePeriodicos = []; 
      }
    }

    if (lotePeriodicos.length > 0) {
      await repository.salvarEmLote(lotePeriodicos);
      totalProcessado += lotePeriodicos.length;
    }

    const totalNoBanco = await repository.contarTodos();
    
    console.log("=========================================");
    console.log("IMPORTAÇÃO CONCLUÍDA COM SUCESSO");
    console.log(`Total lido do CSV: ${totalProcessado}`);
    console.log(`Total de registros no banco: ${totalNoBanco}`);
    console.log("=========================================");

  } catch (erro) {
    console.error("Erro durante a importação:", erro);
  } finally {
    await prisma.$disconnect();
  }
}

importarDados();