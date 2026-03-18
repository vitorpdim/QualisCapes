// ==============================================================
// ESTATÍSTICAS gráficos e resumos
// ==============================================================

import { BarChart3 } from "lucide-react";
import type { EstatisticaEstrato, EstratoQualis } from "../types/periodico";

// ==============================================================
// TIPOS E CONSTANTES
// ==============================================================

export interface StatisticsProps {
  estatisticas: EstatisticaEstrato[];
  loading?: boolean;
}

const CORES_ESTRATO: Record <EstratoQualis, string> = {
  A1: "bg-emerald-500", A2: "bg-teal-500", A3: "bg-cyan-500", A4: "bg-sky-500",
  B1: "bg-blue-500", B2: "bg-slate-500", B3: "bg-gray-500", B4: "bg-neutral-500", B5: "bg-stone-500",
  C:  "bg-red-500",
};

const CORES_TEXTO: Record <EstratoQualis, string> = {
  A1: "text-emerald-700", A2: "text-teal-700", A3: "text-cyan-700", A4: "text-sky-700",
  B1: "text-blue-700", B2: "text-slate-700", B3: "text-gray-700", B4: "text-neutral-700", B5: "text-stone-700",
  C:  "text-red-700",
};

// ==============================================================
// COMPONENTE PRINCIPAL
// ==============================================================

export function Statistics({ estatisticas, loading }: StatisticsProps) {
  
  // ==============================================================
  // RENDERIZAÇÕES CONDICIONAIS
  // ==============================================================

  if (loading) {
    return (
      <div className = "bg-white rounded-x1 shadow-sm border-gray-200 p-12">
        <div className = "flex flex col items-center justify-center gap-4">
          <div className = "w-12 h-12 border-blue-200 border-t-blue-600 rounded-full animate-spin"/> 
          <p className = "text-gray-600">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (estatisticas.length === 0) {
    return (
      <div className = "bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className = "flex flex-col items-center justify-center gap-4 text-gray-500">
          <BarChart3 className = "w-16 h-16 text-gray-300"/>
          <p className = "text-lg font-medium">Nenhuma estatística disponível</p>
        </div>
      </div>
    );
  }

  // ==============================================================
  // CALCULOS DERIVADOS
  // ==============================================================

  const maxQuantidade = Math.max(...estatisticas.map(e => e.quantidade));
  const totalPeriodicos = estatisticas.reduce((acc, e) => acc + e.quantidade, 0);

  // ==============================================================
  // RENDERIZAÇAO
  // ==============================================================

  return (
    <div className = "bg-white rounded-x1 shadow-sm border border-gray-200 p-6">
      
      <div className = "mb-6">
        <h3 className = "text-lg font-semibold text-gray-900 mb-2">Distribuição por estrato</h3>
        <p className = "text-sm text-gray-600">Total de {totalPeriodicos.toLocaleString("pt-BR")} periódicos</p>
      </div>

      <div className = "space-y-4">
        {estatisticas.map((stat) => {
          const porcentagem = (stat.quantidade / maxQuantidade) * 100;
          const porcentagemTotal = ((stat.quantidade / totalPeriodicos) * 100).toFixed(1);

          return (
            <div key={stat.estrato} className = "space-y-2">
              <div className = "flex items-center justify-between">
                <div className = "flex items-center gap-3">
                  <span className = {`font-bold text-lg ${CORES_TEXTO[stat.estrato]}`}>{stat.estrato}</span>
                  <span className = "text-sm text-gray-600">{porcentagemTotal}%</span>
                </div>

                <span className = "text-sm font-semibold text-gray-900">{stat.quantidade.toLocaleString("pt-BR")}</span>
              </div>
              <div className = "relative h-8 bg-gray-100 text-gray-100 roounded-lg overflow-hidden">
                <div style={{ width: `${porcentagem}%` }} />
              </div>
            </div>
          );
        })}
      </div>

{/* ------------ resumo consolidado estratos A e B --------------- */}
      <div>
        <div>
          <div>
            <p>Estratos A</p>
            <p>
              {estatisticas.filter(e => e.estrato.startsWith("A")).reduce((acc, e) => acc + e.quantidade, 0).toLocaleString("pt-BR")}
            </p>
          </div>
          <div>
            <p>Estratos B</p>
            <p>
              {estatisticas.filter(e => e.estrato.startsWith("B")).reduce((acc, e) => acc + e.quantidade, 0).toLocaleString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}