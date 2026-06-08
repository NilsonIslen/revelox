import { useState } from 'react'
import { ShoppingBag, Wallet } from 'lucide-react'
import { type XnoPackage, xnoPackages } from './packages'
import { paymentAccounts, supportLine } from './paymentAccounts'

export function XnoStore() {
  const [selectedPackage, setSelectedPackage] = useState<XnoPackage | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'cop' | 'btc' | 'usdt'>('cop')
  const [receiverAddress, setReceiverAddress] = useState('')

  const getPaymentAmount = (item: XnoPackage) => {
    if (paymentMethod === 'cop') return item.cop
    if (paymentMethod === 'btc') return item.btc

    return item.usdt
  }

  return (
    <main className="store-shell">
      <header className="store-topbar">
        <div className="store-brand">
          <span className="store-brand-mark">XN</span>
          <span>Tienda XNO</span>
        </div>
      </header>

      <section className="store-page" aria-label="Tienda XNO">
        <div className="store-heading">
          <ShoppingBag size={24} aria-hidden="true" />
          <div>
            <p className="store-eyebrow">Compra Nano</p>
            <h1>Paquetes Nano</h1>
          </div>
        </div>

        <div className="package-grid">
          {xnoPackages.map((item) => {
            const isSelected = selectedPackage?.amount === item.amount

            return (
              <article
                className={isSelected ? 'package-item selected' : 'package-item'}
                key={item.amount}
              >
                <button
                  className="package-card"
                  type="button"
                  onClick={() => setSelectedPackage(isSelected ? null : item)}
                >
                  <strong>{item.amount} XNO</strong>
                  <span>{item.cop}</span>
                  <span>{item.btc}</span>
                  <span>{item.usdt}</span>
                </button>

                {isSelected && (
                  <section className="receive-panel" aria-label="Direccion para recibir XNO">
                    <div className="payment-methods" aria-label="Metodo de pago">
                      <button
                        className={paymentMethod === 'cop' ? 'selected' : ''}
                        type="button"
                        onClick={() => setPaymentMethod('cop')}
                      >
                        COP
                      </button>
                      <button
                        className={paymentMethod === 'btc' ? 'selected' : ''}
                        type="button"
                        onClick={() => setPaymentMethod('btc')}
                      >
                        BTC
                      </button>
                      <button
                        className={paymentMethod === 'usdt' ? 'selected' : ''}
                        type="button"
                        onClick={() => setPaymentMethod('usdt')}
                      >
                        USDT
                      </button>
                    </div>

                    <div className="payment-target">
                      <span>Instruccion de pago</span>
                      <strong>{paymentAccounts[paymentMethod].value}</strong>
                      <p>
                        {paymentAccounts[paymentMethod].instructionPrefix}{' '}
                        {getPaymentAmount(item)} {paymentAccounts[paymentMethod].instructionConnector}{' '}
                        {paymentAccounts[paymentMethod].label}
                      </p>
                    </div>

                    <label className="store-field">
                      <span>Direccion Nano</span>
                      <input
                        value={receiverAddress}
                        onChange={(event) => setReceiverAddress(event.target.value)}
                        placeholder="nano_..."
                      />
                      <small>Recibes {item.amount} XNO.</small>
                    </label>

                    <div className="wallet-box">
                      <p className="wallet-note">Necesitas wallet (monedero XNO).</p>

                      <a
                        className="wallet-download"
                        href="https://nautilus.io/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Wallet size={18} aria-hidden="true" />
                        Descargar wallet (monedero XNO)
                      </a>
                    </div>

                    <div className="delivery-note">
                      <p>Envio inmediato tras confirmar pago. Max. 24 horas.</p>
                      <span>Soporte: {supportLine}</span>
                    </div>
                  </section>
                )}
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
