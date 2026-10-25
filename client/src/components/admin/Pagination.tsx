import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  visibleResults: number
  totalResults: number
  currentPage: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function Pagination({
  visibleResults,
  totalResults,
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) {
  const pageGroupSize = 3
  const firstPageInGroup = Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1
  const visiblePages = Array.from(
    { length: Math.min(pageGroupSize, pageCount - firstPageInGroup + 1) },
    (_, index) => firstPageInGroup + index,
  )
  const hasPreviousGroup = firstPageInGroup > 1
  const hasNextGroup = firstPageInGroup + pageGroupSize <= pageCount

  return (
    <div className="flex flex-col gap-3 border-t border-[#e8eeec] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-[#788580]">
        Mostrando {visibleResults} de {totalResults} registros
      </p>

      <nav aria-label="Paginación de centros y box" className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Páginas anteriores"
          disabled={!hasPreviousGroup}
          onClick={() => onPageChange(Math.max(1, firstPageInGroup - pageGroupSize))}
          className="grid size-8 place-items-center rounded border border-[#e8eeec] text-[#65736f] transition-colors hover:bg-[#f4f8f6] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={currentPage === page ? 'page' : undefined}
            onClick={() => onPageChange(page)}
            className={`grid size-8 place-items-center rounded text-xs font-semibold ${
              currentPage === page
                ? 'bg-[#147e72] text-white'
                : 'text-[#65736f] hover:bg-[#eef4f1]'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          aria-label="Páginas siguientes"
          disabled={!hasNextGroup}
          onClick={() => onPageChange(Math.min(pageCount, firstPageInGroup + pageGroupSize))}
          className="grid size-8 place-items-center rounded border border-[#e8eeec] text-[#65736f] transition-colors hover:bg-[#f4f8f6] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}