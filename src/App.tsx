import { useMemo, useState } from 'react'
import { Lock, ShieldCheck, Wallet } from 'lucide-react'
import { xnoUsdRate } from './config/xnoRate'
import './App.css'

const LOGIN_AMOUNT = '0.01'
const LOGIN_AMOUNT_RAW = '10000000000000000000000000000'
const loginReceiverAddress = import.meta.env.VITE_LOGIN_RECEIVER_NANO_ADDRESS?.trim() ?? ''
const xnoStoreUrl =
  import.meta.env.VITE_XNO_STORE_URL?.trim() ||
  `${window.location.protocol}//${window.location.hostname}:5174`

type Question = {
  id: number
  prompt: string
  answerField: 'text' | 'textarea'
  answer: string
  price: string
  suggestedPrice: string
}

const parentQuestions: Question[] = [
  {
    id: 1,
    prompt: 'Nombre completo',
    answerField: 'text',
    answer: '',
    price: '',
    suggestedPrice: '0.10',
  },
]

function App() {
  const [questions, setQuestions] = useState(parentQuestions)
  const [hasRequestedLogin, setHasRequestedLogin] = useState(false)
  const isLoggedIn = false

  const formatUsdFromXno = (xnoValue: string, decimals = 2) => {
    const amount = Number.parseFloat(xnoValue)
    const rate = Number.parseFloat(xnoUsdRate)

    if (!Number.isFinite(amount) || !Number.isFinite(rate)) return null

    return (amount * rate).toFixed(decimals)
  }

  const formatUsdReference = (xnoValue: string) => {
    const amount = Number.parseFloat(xnoValue)
    const rate = Number.parseFloat(xnoUsdRate)

    if (!Number.isFinite(amount) || !Number.isFinite(rate)) return null

    const usdValue = amount * rate
    const decimals = usdValue < 0.1 ? 4 : 2

    return usdValue.toFixed(decimals)
  }

  const loginUsdValue = formatUsdFromXno(LOGIN_AMOUNT, 4)

  const completedQuestions = questions.filter(
    (question) =>
      question.answer.trim() &&
      Number.parseFloat(question.price) > 0,
  ).length

  const totalProfileValue = useMemo(
    () =>
      questions.reduce((sum, question) => {
        const price = Number.parseFloat(question.price)
        return question.answer.trim() && Number.isFinite(price) ? sum + price : sum
      }, 0),
    [questions],
  )

  const updateQuestion = (id: number, field: 'answer' | 'price', value: string) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === id ? { ...question, [field]: value } : question,
      ),
    )
  }

  const openNanoWallet = () => {
    if (!loginReceiverAddress) return

    const paymentUri = `nano:${loginReceiverAddress}?amount=${LOGIN_AMOUNT_RAW}`
    setHasRequestedLogin(true)
    window.location.href = paymentUri
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">CN</span>
          <span>Revelox</span>
        </div>
        <span className={isLoggedIn ? 'session-pill verified' : 'session-pill'}>
          <Lock size={16} aria-hidden="true" />
          Solo lectura
        </span>
      </header>

      <section className="intro-section">
        <aside className="login-card" aria-label="Verificacion de cuenta Nano">
          <div className="login-heading">
            <ShieldCheck size={22} aria-hidden="true" />
            <div>
              <h2>Login Nano</h2>
              <p>
                {LOGIN_AMOUNT} XNO{loginUsdValue ? ` ~= ${loginUsdValue} USD` : ''}
              </p>
            </div>
          </div>

          <button
            className="primary-action"
            type="button"
            onClick={openNanoWallet}
            disabled={!loginReceiverAddress}
          >
            <Wallet size={18} aria-hidden="true" />
            Loguearme con Nano
          </button>

          <p className="payment-status">
            {hasRequestedLogin
              ? 'Esperando confirmacion.'
              : 'Pago minimo solo para validar tu cuenta.'}
          </p>

          <div className="rate-card">
            <span>Referencia</span>
            <strong>1 XNO = {xnoUsdRate} USD</strong>
          </div>

          {hasRequestedLogin && (
            <div className="wallet-help single-action">
              <a href={xnoStoreUrl}>Comprar Nano al creador</a>
              <a href="https://hub.nano.org/trading" target="_blank" rel="noreferrer">
                Comprar Nano con otros proveedores
              </a>
            </div>
          )}
        </aside>
      </section>

      <section className="questionnaire-layout">
        <form className="questionnaire" aria-label="Formulario para crear perfil">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Crear perfil</p>
              <h2>Preguntas</h2>
            </div>
          </div>

          <p className="questionnaire-note">
            Responde solo lo que estes dispuesto a revelar y elige con quien compartirlo.
          </p>

          <div className="form-stack">
            {questions.map((question) => (
              <article className="question-card" key={question.id}>
                {!isLoggedIn && (
                  <span className="locked-badge">
                    <Lock size={14} aria-hidden="true" />
                    Login requerido
                  </span>
                )}

                <h3 className="fixed-question">{question.prompt}</h3>

                <label className="field-label">
                  {question.answerField === 'text' ? (
                    <input
                      type="text"
                      value={question.answer}
                      onChange={(event) =>
                        updateQuestion(question.id, 'answer', event.target.value)
                      }
                      placeholder={isLoggedIn ? 'Respuesta privada' : 'Bloqueado'}
                      disabled={!isLoggedIn}
                    />
                  ) : (
                    <textarea
                      value={question.answer}
                      onChange={(event) =>
                        updateQuestion(question.id, 'answer', event.target.value)
                      }
                      placeholder={isLoggedIn ? 'Respuesta privada' : 'Bloqueado'}
                      disabled={!isLoggedIn}
                    />
                  )}
                </label>

                <label className="field-label price-field">
                  <span>Cuanto cobras por revelar esta respuesta?</span>
                  <div className="price-input">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={question.price}
                      onChange={(event) =>
                        updateQuestion(question.id, 'price', event.target.value)
                      }
                      placeholder={`Ejemplo ${question.suggestedPrice}`}
                      disabled={!isLoggedIn}
                    />
                    <strong>Nano</strong>
                  </div>
                  {formatUsdReference(question.price || question.suggestedPrice) && (
                    <small className="usd-reference">
                      ~{formatUsdReference(question.price || question.suggestedPrice)} USD
                    </small>
                  )}
                </label>
              </article>
            ))}
          </div>
        </form>

        <aside className="summary-panel" aria-label="Estado del perfil">
          <h2>Estado</h2>
          <div className="summary-row">
            <span>Acceso</span>
            <strong>{isLoggedIn ? 'Editable' : 'Bloqueado'}</strong>
          </div>
          <div className="summary-row">
            <span>Respuestas</span>
            <strong>
              {completedQuestions} / {questions.length}
            </strong>
          </div>
          <div className="summary-row">
            <span>Valor estimado</span>
            <strong>{totalProfileValue.toFixed(2)} Nano</strong>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default App
