import { useState } from 'react'
import { primaryButtonClassName } from '../constants/classNames'
import Modal from './Modal'

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
    <Modal
      eyebrow="Account"
      title="Login"
      titleId="login-title"
      onClose={onClose}
    >
      <div className="p-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

          <button className={primaryButtonClassName} type="submit">
            Login
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default LoginModal
