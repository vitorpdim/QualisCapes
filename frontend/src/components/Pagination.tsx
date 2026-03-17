// ==============================================================
// COMPONENTE DE PAGINAÇÃO
// ==============================================================

import { ChevronLeft, ChevronRight } from "lucide-react";

// ==============================================================
// TIPOS E INTERFACES
// ==============================================================

export interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  total: number;
  onPaginaChange: (pagina: number) => void;
}

// ==============================================================
// COMPONENTE PRINCIPAL
// ==============================================================

export function Pagination({ paginaAtual, totalPaginas, total, onPaginaChange }: PaginationProps) {
  
  // ==============================================================
  // REGRAS DE NEGÓCIO logica de exibição de páginas
  // ==============================================================
  
  const gerarPaginas = (): (number | string)[] => {
    const paginas: (number | string)[] = [];
    const maxPaginasVisiveis = 7;

    if (totalPaginas <= maxPaginasVisiveis) {
      for (let i = 1; i <= totalPaginas; i++) paginas.push(i);
      return paginas;
    }

    paginas.push(1);
    if (paginaAtual > 3) paginas.push("...");

    const inicio = Math.max(2, paginaAtual - 1);
    const fim = Math.min(totalPaginas - 1, paginaAtual + 1);

    for (let i = inicio; i <= fim; i++) paginas.push(i);

    if (paginaAtual < totalPaginas - 2) paginas.push("...");
    paginas.push(totalPaginas);

    return paginas;
  };

  const paginas = gerarPaginas();

  // ==============================================================
  // RENDERIZAÇÃO
  // ==============================================================

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        
        <div className="text-sm text-gray-600">
          Mostrando <span className="font-medium text-gray-900">{total}</span> periódicos
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPaginaChange(paginaAtual - 1)}
            disabled={paginaAtual === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {paginas.map((pagina, index) => (
            typeof pagina === "number" ? (
              <button
                key={index}
                onClick={() => onPaginaChange(pagina)}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-colors
                  ${pagina === paginaAtual
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                {pagina}
              </button>
            ) : (
              <span key={index} className="px-2 text-gray-400">
                {pagina}
              </span>
            )
          ))}

          <button
            onClick={() => onPaginaChange(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
      </div>
    </div>
  );
}