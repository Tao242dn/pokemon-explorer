import { closeButtonClassName } from '../constants/classNames'

const Modal = ({
  children,
  eyebrow,
  panelClassName = 'max-w-md',
  title,
  titleId,
  onClose,
}) => {
  return (
    <div
      aria-labelledby={titleId}
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
      role="dialog"
    >
      <section
        className={`w-full rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 ${panelClassName}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-slate-800">
          <div>
            {eyebrow && (
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                {eyebrow}
              </p>
            )}
            <h2
              id={titleId}
              className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-50"
            >
              {title}
            </h2>
          </div>

          <button
            aria-label={`Close ${title.toLowerCase()} modal`}
            className={closeButtonClassName}
            type="button"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark text-xl leading-none"></i>
          </button>
        </div>

        {children}
      </section>
    </div>
  )
}

export default Modal
