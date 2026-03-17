// ==============================================================
// VIEW: DASHBOARD (Página Principal)
// ==============================================================

import { useState, useEffect } from "react";
import { Table, BarChart3, GraduationCap } from "lucide-react";

import { SearchFilters } from "../components/SearchFilters";
import { PeriodTable } from "../components/PeriodTable";
import { Statistics } from "../components/Statistics";
import { Pagination } from "../components/Pagination";
import { Tabs } from "../components/Tabs";

import { usePeriodicos } from "../hooks/usePeriodicos";
import { useEstatisticas } from "../hooks/useEstatisticas";
import { apiService } from "../services/ApiService";
import type { FiltrosBusca } from "../types/periodico";

// ==============================================================
// TIPOS E CONSTANTES
// ==============================================================

export type AbaAtiva = "tabela" | "estatisticas";

// ==============================================================
// COMPONENTE PRINCIPAL
// ==============================================================

export function Dashboard() {
  // ==============================================================
  // ESTADOS E HOOKS
  // ==============================================================
  const [filtros, setFiltros] = useState<FiltrosBusca>({});
  const [areas, setAreas] = useState<string[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>("tabela");
  const [setCarregandoAreas] = useState<boolean>(true);

  const {
    periodicos,
    loading: loadingPeriodicos,
    total,
    paginaAtual,
    totalPaginas,
    buscar: buscarPeriodicos,
  } = usePeriodicos();
  const {
    estatisticas,
    loading: loadingEstatisticas,
    buscar: buscarEstatisticas,
  } = useEstatisticas();

  // ==============================================================
  // EFEITOS
  // ==============================================================

  // load inicial (areas, periodicos e estatisticas)
  useEffect(() => {
    const carregarAreas = async () => {
      try {
        const areasData = await apiService.listarAreas();
        setAreas(areasData);
      } catch (erro) {
        console.error("Erro ao carregar áreas:", erro);
      } finally {
        setCarregandoAreas(false);
      }
    };

    carregarAreas();
    buscarPeriodicos({});
    buscarEstatisticas();
  }, []);

  // isso recarrega os dados sempre que os filtros mudam
  useEffect(() => {
    buscarPeriodicos(filtros, 1);
    if (abaAtiva === "estatisticas") buscarEstatisticas(filtros.area);
  }, [filtros]);

  // isso busca as estatísticas caso a aba mude
  useEffect(() => {
    if (abaAtiva === "estatisticas") buscarEstatisticas(filtros.area);
  }, [abaAtiva]);

  // ==============================================================
  // AÇÕES / HANDLERS
  // ==============================================================

  const handleFiltrosChange = (novosFiltros: FiltrosBusca): void =>
    setFiltros(novosFiltros);
  const handleLimparFiltros = (): void => setFiltros({});
  const handleAbaChange = (novaAba: string): void =>
    setAbaAtiva(novaAba as AbaAtiva);

  const handlePaginaChange = (novaPagina: number): void => {
    buscarPeriodicos(filtros, novaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = [
    { id: "tabela", label: "Periódicos", icon: <Table /> },
    {
      id: "estatisticas",
      label: "Estatísticas",
      icon: <BarChart3 />,
    },
  ];

  // ==============================================================
  // RENDERIZAÇÃO
  // ==============================================================

  return (
    <div>

  {/* --------------------- HEADER ----------------------------- */}

      <header>
        <div>
          <div>
            <div>
              <GraduationCap />
            </div>
            <div>
              <h1> Sistema QUALIS CAPES </h1>
              <p> Consulta e visualização de classificações de periódicos científicos</p>
            </div>
          </div>
        </div>
      </header>

 {/* ------------------- MAIN SECTION -----------------------  */}

      <main>
        <div>

      {/* ------------ FILTROS SIDEBAR ------------------ */}

          <aside>
            <SearchFilters
              filtros={filtros}
              areas={areas}
              onFiltrosChange={handleFiltrosChange}
              onLimpar={handleLimparFiltros}
            />
          </aside>

      {/* --------------- RESULTADOS E ESTATÍSTICAS ---------------- */}
          
          <section>
            <div>
              <Tabs
                tabs={tabs}
                activeTab={abaAtiva}
                onTabChange={handleAbaChange}
              />

              <div>
                {abaAtiva === "tabela" ? (
                  <>
                    <PeriodTable
                      periodicos={periodicos}
                      loading={loadingPeriodicos}
                    />
                    {!loadingPeriodicos && periodicos.length > 0 && (
                      <div>
                        <Pagination
                          paginaAtual={paginaAtual}
                          totalPaginas={totalPaginas}
                          total={total}
                          onPaginaChange={handlePaginaChange}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Statistics
                    estatisticas={estatisticas}
                    loading={loadingEstatisticas}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

    {/* ------------------ FOOTER ------------------ */}

      <footer>
        <div>
          <p>
            Dados: CAPES - classificação de periódicos entre 2021-2024
          </p>
        </div>
      </footer>
    </div>
  );
}