const Pagination = ({ currentPage, pageNumbers, totalPages, onPageChange }) => {
  return (
    <nav
      aria-label="Pokemon pages"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <button
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          aria-current={pageNumber === currentPage ? 'page' : undefined}
          className={`h-10 w-10 rounded-lg border text-sm font-bold transition ${
            pageNumber === currentPage
              ? 'border-emerald-600 bg-emerald-600 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
          }`}
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
