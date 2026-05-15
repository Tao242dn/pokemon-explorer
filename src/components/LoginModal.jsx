import { useState } from 'react'
import { primaryButtonClassName } from '../constants/classNames'
import Modal from './Modal'

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
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
            <div className="relative mt-2">
              <input
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-12 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:ring-emerald-900"
                id="login-password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Enter password'
                required
              />
              <button
                aria-label={
                  isPasswordVisible ? 'Hide password' : 'Show password'
                }
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 cursor-pointer dark:text-slate-300 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
                type="button"
                onClick={() =>
                  setIsPasswordVisible((currentValue) => !currentValue)
                }
              >
                <i
                  aria-hidden="true"
                  className={`fa-solid ${
                    isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </button>
            </div>
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
