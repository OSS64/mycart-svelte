// appconstant.ts
export const CurrencyCode = 'INR'

// utils.ts
export const priceFormatter = (price, currency: 'INR') => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currency,
	}).format(price)
}

// component.svelte

import { priceFormatter } from '../utils'
import { CurrencyCode } from '../appconstant'

const price = 1000
const formattedPrice = priceFormatter(price, CurrencyCode)

// formattedPrice = ₹1,000.00
