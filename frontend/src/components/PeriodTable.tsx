// ==============================================================
// TABELA DE PERIÓDICOS
// ==============================================================

import { BookOpen } from "lucide-react";
import type { EstratoQualis, Periodico } from "../types/periodico";

// ==============================================================
// TIPOS E CONSTANTES
// ==============================================================

export interface PeriodTableProps {
  periodicos: Periodico[];
  loading?: boolean;
}

const CORES_ESTRATO: Record<EstratoQualis, string> = {
  A1: "bg-emerald-100 text-emerald-800",
  A2: "bg-teal-100 text-teal-800",
  A3: "bg-cyan-100 text-cyan-800",
  A4: "bg-sky-100 text-sky-800",
  B1: "bg-blue-100 text-blue-800",
  B2: "bg-slate-100 text-slate-800",
  B3: "bg-gray-100 text-gray-800",
  B4: "bg-neutral-100 text-neutral-800",
  B5: "bg-stone-100 text-stone-800",
  C:  "bg-red-100 text-red-800",
};


// ==============================================================
// COMPONENTE PRINCIPAL
// ==============================================================

export function PeriodTable({ periodicos, loading }: PeriodTableProps) {
  
// ==============================================================
// RENDERIZAÇÕES CONDICIONAIS
// ==============================================================

  if (loading) {
    return (
      <div className = "bg-white rounded-x1 shadow-sm border-gray-200 p-12">
        <div className = "flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 text-gray-300" />
          <p className = "text-gray-600">Carregando periódicos...</p>
        </div>
      </div>
    );
  }

  if (periodicos.length === 0) {
    return (
      <div className = "bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div className = "flex flex-col items-center justify-center gap-4 text-gray-500">
          <BookOpen className = "w-16 h-16 text-gray-300"/>
          <p className = "text-lg font-medium">Nenhum periódico encontrado</p>
          <p className = "text-sm">Tente ajustar os filtros de busca!</p>
        </div>
      </div>
    );
  }

  // ==============================================================
  // RENDERIZAÇÃO DA TABELA
  // ==============================================================


  return (
    <div className = "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className = "overflow-x-auto">
        <table className = "w-full">
          <thead>
            <tr className = "bg-gray-50 border-b border-gray-200">
              <th className = "px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estrato</th>
              <th className = "px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Título</th>
              <th className = "px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ISSN</th>
              <th className = "px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Área de avaliação</th>
            </tr>
          </thead>
          <tbody className = "divide-y divide-gray-200">

            {periodicos.map((periodico) => (
              <tr key={periodico.id} className="hover:bg-gray-50 transition-colors">
                
                <td className = "px-6 py-4 whitespace-nowrap">
                  <span className = {`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${CORES_ESTRATO[periodico.estrato]}`}>
                    {periodico.estrato}
                  </span>
                </td>
                
                <td className = "px-6 py-4">
                  <div className = "text-sm font-medium text-gray-900 line-clamp-2">{periodico.titulo}</div>
                </td>
                
                <td className = "px-6 py-4 whitespace-nowrap">
                  <div className = "text-sm text-gray-900 line-clamp-2">{periodico.issn}</div>
                </td>

                <td className = "px-6 py-4">
                  <div className = "text-sm text-gray-600 line-clamp-2">{periodico.areaAvaliacao}</div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}