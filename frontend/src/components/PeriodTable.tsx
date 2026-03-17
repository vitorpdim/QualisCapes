// ==============================================================
// COMPONENTE: TABELA DE PERIÓDICOS
// ==============================================================

import { BookOpen } from "lucide-react";
import type { Periodico } from "../types/periodico";

// ==============================================================
// TIPOS E CONSTANTES
// ==============================================================

export interface PeriodTableProps {
  periodicos: Periodico[];
  loading?: boolean;
}


// ==============================================================
// COMPONENTE PRINCIPAL
// ==============================================================

export function PeriodTable({ periodicos, loading }: PeriodTableProps) {
  
// ==============================================================
// RENDERIZAÇÕES CONDICIONAIS
// ==============================================================

  if (loading) {
    return (
      <div>
        <div>
          <div />
          <p>Carregando periódicos...</p>
        </div>
      </div>
    );
  }

  if (periodicos.length === 0) {
    return (
      <div>
        <div>
          <BookOpen />
          <p>Nenhum periódico encontrado</p>
          <p>Tente ajustar os filtros de busca!</p>
        </div>
      </div>
    );
  }

  // ==============================================================
  // RENDERIZAÇÃO DA TABELA
  // ==============================================================

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Estrato</th>
              <th>Título</th>
              <th>ISSN</th>
              <th>Área de avaliação</th>
            </tr>
          </thead>
          <tbody>
            {periodicos.map((periodico) => (
              <tr key={periodico.id}>
                <td>
                  <span>
                    {periodico.estrato}
                  </span>
                </td>
                <td>
                  <div>{periodico.titulo}</div>
                </td>
                <td>
                  <div>{periodico.issn}</div>
                </td>
                <td>
                  <div>{periodico.areaAvaliacao}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}