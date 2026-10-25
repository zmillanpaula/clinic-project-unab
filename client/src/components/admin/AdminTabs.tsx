import { ADMIN_TABS } from '../../constants/admin'
import type { AdminTab } from '../../types/admin'

type AdminTabsProps = {
  activeTab: AdminTab
  onSelectTab: (tab: AdminTab) => void
}

export function AdminTabs({ activeTab, onSelectTab }: AdminTabsProps) {
  return (
    <div className="mt-7 overflow-x-auto overflow-y-hidden border-b border-[#dfe8e5] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div role="tablist" aria-label="Secciones de estructura clínica" className="flex min-w-max gap-6 sm:gap-8">
        {ADMIN_TABS.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectTab(tab)}
              className={`relative min-h-11 px-0.5 text-sm font-medium transition-colors ${
                isActive ? 'text-[#176b5f]' : 'text-[#74817e] hover:text-[#334541]'
              }`}
            >
              {tab}
              {isActive && <span className="absolute inset-x-0 bottom-[-1px] h-0.5 rounded-full bg-[#25887b]" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}