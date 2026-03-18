// ==============================================================
// FILTROS DE BUSCA
// ==============================================================

import { Search, X } from "lucide-react";
import type { FiltrosBusca, EstratoQualis } from "../types/periodico";

// ==============================================================
// TIPOS E CONSTANTES
// ==============================================================

export interface SearchFiltersProps {
  filtros: FiltrosBusca;
  areas: string[];
  onFiltrosChange: (filtros: FiltrosBusca) => void;
  onLimpar: () => void;
}

const ESTRATOS: EstratoQualis[] = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "B5", "C"];

const CORES_ESTRATO: Record<EstratoQualis, string> = {
  A1: "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200",
  A2: "bg-teal-100 text-teal-800 border-teal-300 hover:bg-teal-200",
  A3: "bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200",
  A4: "bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200",
  B1: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
  B2: "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200",
  B3: "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200",
  B4: "bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200",
  B5: "bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200",
  C:  "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
};

// ==============================================================
// COMPONENTE PRINCIPAL
// ==============================================================

export function SearchFilters({ filtros, areas, onFiltrosChange, onLimpar }: SearchFiltersProps) {
  
  // ==============================================================
  // AÇÕES / HANDLERS
  // ==============================================================

  const handleTermoChange = (termo: string): void => { onFiltrosChange({ ...filtros, termo: termo || undefined }); };
  const handleAreaChange = (area: string): void => { onFiltrosChange({ ...filtros, area: area || undefined }); };
  const handleEstratoToggle = (estrato: EstratoQualis): void => {
    const novoEstrato = filtros.estrato === estrato ? undefined : estrato;
    onFiltrosChange({ ...filtros, estrato: novoEstrato });
  };

  const temFiltrosAtivos = Boolean(filtros.termo || filtros.area || filtros.estrato);

  // ==============================================================
  // RENDERIZAÇÃO
  // ==============================================================

  return (
    <div className = "bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      
  {/* --------- HEADER ----------- */}
      <div className = "flex items-center justify-between">
        <h2 className = "text-lg font-semibold text-gray-900">Filtros de busca</h2>
        {temFiltrosAtivos && (
          <button
            onClick={onLimpar}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 transition-all outline-none">
            <X className="w-4 h-4" /> Limpar filtros </button>
        )}
      </div>

      <div>

    {/* ----------- INPUTAR TERMO ---------- */}

        <div>
          <label htmlFor="termo">Buscar título ou ISSN</label>
          <div className = "relative">
            <Search className = "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <input
              id="termo"
              type="text"
              value={filtros.termo || ""}
              onChange={(e) => handleTermoChange(e.target.value)}
              placeholder="Digite o título ou ISSN..."
              className = "w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"/>
          </div>
        </div>

    {/* -------- SELECT NA AREA ------- */}

        <div>
          <label htmlFor = "area" className = "block text-sm font-medium text-gray-700 mb-2">Área de avaliação</label>
          <select
            id = "area"
            value = {filtros.area || ""}
            onChange={(e) => handleAreaChange(e.target.value)}
            className = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-what">
            
            <option value = "">Todas as áreas</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

      {/* -------------- BTN ------------- */}
        
        <div>
          <label className = "block text-sm font-medium text-gray-700 mb-3">Estrato QUALIS</label>
          <div className = "grid grid-cols-5 gap-2">
            {ESTRATOS.map((estrato) => (
              <button
                key={estrato}
                onClick={() => handleEstratoToggle(estrato)}
                className={`
                  px-3 py-2 rounded-lg font-medium text-sm border-2 transition-all
                  ${filtros.estrato === estrato ? `${CORES_ESTRATO[estrato]} ring-2 ring-offset-2 ring-blue-500` : `${CORES_ESTRATO[estrato]} opacity-60`}`}>
                {estrato}
              </button>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}