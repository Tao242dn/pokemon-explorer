import { useEffect, useRef, useState } from 'react'
import { iconButtonClassName } from '../constants/classNames'

const UserMenu = ({ onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-controls="user-menu"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 ${iconButtonClassName}`}
        type="button"
        onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
      >
        <i aria-hidden="true" className="fa-regular fa-circle-user"></i>
        {user.username}
        <i aria-hidden="true" className="fa-solid fa-chevron-down text-xs"></i>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-20 mt-2 w-25 rounded-lg border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
          id="user-menu"
        >
          <button
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
            type="button"
            onClick={handleLogout}
          >
            <i
              aria-hidden="true"
              className="fa-solid fa-right-from-bracket"
            ></i>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
