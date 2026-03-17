// ==============================================================
// COMPONENTE: FILTROS DE BUSCA (Sidebar)
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
    <div>
      
  {/* --------- HEADER ----------- */}
      <div>
        <h2>Filtros de busca</h2>
        {temFiltrosAtivos && (
          <button onClick={onLimpar}>
            <X /> Limpar filtros
          </button>
        )}
      </div>

      <div>

    {/* ----------- INPUTAR TERMO ---------- */}

        <div>
          <label htmlFor="termo">Buscar título ou ISSN</label>
          <div>
            <Search />
            <input
              id="termo"
              type="text"
              value={filtros.termo || ""}
              onChange={(e) => handleTermoChange(e.target.value)}
              placeholder="Digite o título ou ISSN..."
            />
          </div>
        </div>

    {/* -------- SELECT NA AREA ------- */}

        <div>
          <label htmlFor="area">Área de avaliação</label>
          <select
            id="area"
            value={filtros.area || ""}
            onChange={(e) => handleAreaChange(e.target.value)}
          >
            <option value="">Todas as áreas</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

      {/* -------------- BTN ------------- */}
        
        <div>
          <label>Estrato QUALIS</label>
          <div>
            {ESTRATOS.map((estrato) => (
              <button
                key={estrato}
                onClick={() => handleEstratoToggle(estrato)}>
                {estrato}
              </button>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}