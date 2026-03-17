// ==============================================================
// COMPONENTE: ESTATÍSTICAS (Gráficos e Resumos)
// ==============================================================

import { BarChart3 } from "lucide-react";
import type { EstatisticaEstrato } from "../types/periodico";

// ==============================================================
// TIPOS E CONSTANTES
// ==============================================================

export interface StatisticsProps {
  estatisticas: EstatisticaEstrato[];
  loading?: boolean;
}

// ==============================================================
// COMPONENTE PRINCIPAL
// ==============================================================

export function Statistics({ estatisticas, loading }: StatisticsProps) {
  
  // ==============================================================
  // RENDERIZAÇÕES CONDICIONAIS (Early Returns)
  // ==============================================================

  if (loading) {
    return (
      <div>
        <div>
          <div />
          <p>Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  if (estatisticas.length === 0) {
    return (
      <div>
        <div>
          <BarChart3 />
          <p>Nenhuma estatística disponível</p>
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
    <div>
      
      <div>
        <h3>Distribuição por estrato</h3>
        <p>Total de {totalPeriodicos.toLocaleString("pt-BR")} periódicos</p>
      </div>

      <div>
        {estatisticas.map((stat) => {
          const porcentagem = (stat.quantidade / maxQuantidade) * 100;
          const porcentagemTotal = ((stat.quantidade / totalPeriodicos) * 100).toFixed(1);

          return (
            <div key={stat.estrato}>
              <div>
                <div>
                  <span>{stat.estrato}</span>
                  <span>{porcentagemTotal}%</span>
                </div>
                <span>{stat.quantidade.toLocaleString("pt-BR")}</span>
              </div>
              <div>
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