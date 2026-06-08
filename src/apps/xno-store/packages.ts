import { xnoUnitPrices } from './xnoUnitPrices'

const packageAmounts = [10, 20, 50, 100, 200]

const formatCop = (value: number) =>
  `${new Intl.NumberFormat('es-CO').format(value)} COP`

const formatBtc = (value: number) => `${value.toFixed(8)} BTC`

const formatUsdt = (value: number) => `${value.toFixed(2)} USDT`

export type XnoPackage = {
  amount: number
  cop: string
  btc: string
  usdt: string
}

export const xnoPackages: XnoPackage[] = packageAmounts.map((amount) => ({
  amount,
  cop: formatCop(amount * xnoUnitPrices.cop),
  btc: formatBtc(amount * xnoUnitPrices.btc),
  usdt: formatUsdt(amount * xnoUnitPrices.usdt),
}))
