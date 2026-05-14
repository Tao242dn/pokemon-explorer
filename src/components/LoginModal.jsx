import { useState } from 'react'

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      onLogin({ email, password })
      onClose()
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div
      aria-labelledby="login-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
      role="dialog"
    >
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Account
            </p>
            <h2 id="login-title" className="mt-2 text-2xl font-black text-slate-950 dark:text-slate-50">
              Login
            </h2>
          </div>
          <button
            aria-label="Close login modal"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
            type="button"
            onClick={onClose}
          >
            X
          </button>
        </div>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="login-email">
              Email
            </label>
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:ring-emerald-900"
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder='Enter email'
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="login-password">
              Password
            </label>
            <input
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:ring-emerald-900"
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder='Enter password'
              required
            />
          </div>

          {errorMessage && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
              {errorMessage}
            </p>
          )}

          <button
            className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 cursor-pointer dark:focus:ring-emerald-900"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
