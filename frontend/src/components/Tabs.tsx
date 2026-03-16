// ==============================================================
// COMPONENTE: TABS (Navegação Interna)
// ==============================================================

import type { ReactNode } from "react";

// ==============================================================
// TIPOS E INTERFACES
// ==============================================================

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

// ==============================================================
// RENDERIZAÇÃO
// ==============================================================

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors relative
              ${activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}